from pathlib import Path
import json, subprocess
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
apps=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {apps} from './apps.js'; console.log(JSON.stringify(apps))"],cwd=ROOT/'portfolio',text=True,encoding='utf-8'))
BASE='http://127.0.0.1:4173'
CHROME=r'C:\Program Files\Google\Chrome\Application\chrome.exe'
errors=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path=CHROME)
    page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
    page.on('pageerror',lambda e: errors.append('pageerror: '+str(e)))
    page.on('console',lambda m: errors.append('console error: '+m.text) if m.type=='error' else None)
    page.on('response',lambda r: errors.append(f'HTTP {r.status}: {r.url}') if r.status>=400 else None)
    page.goto(BASE,wait_until='networkidle',timeout=30000)
    page.screenshot(path=str(ROOT/'outputs'/'portfolio-home.png'),full_page=True)
    page.screenshot(path=str(ROOT/'outputs'/'agent-directory.png'),full_page=True)
    assert page.locator('.app-card').count()==20, 'Catalog must show 20 cards'
    page.locator('#search').fill('sql')
    assert page.locator('.app-card').count()==1, 'Search should narrow catalog'
    page.locator('#search').fill('')
    page.locator('#filter').select_option(label='Research & Editorial')
    assert page.locator('.app-card').count()==4, 'Research filter should show 4 cards'
    page.locator('#filter').select_option(label='All systems')
    results=[]
    for app in apps:
        page.goto(f'{BASE}/#/{app["id"]}',wait_until='networkidle',timeout=30000)
        page.wait_for_selector('.task-panel textarea')
        assert page.locator('h1').inner_text().startswith(app['name']), 'Title mismatch '+app['id']
        dest=ROOT/'apps'/app['id']/'screenshots'/'desktop.png'
        page.screenshot(path=str(dest),full_page=True)
        page.locator('#mode').select_option('demo')
        page.locator('#prompt').fill(app['prompt']+' revised')
        page.locator('#run').click()
        page.locator('.result-text').wait_for(timeout=6000)
        assert page.locator('.result-text').inner_text().strip(), 'Empty output '+app['id']
        assert 'DETERMINISTIC DEMO' in page.locator('.result-label').inner_text(), 'Demo source must be labeled '+app['id']
        page.screenshot(path=str(ROOT/'apps'/app['id']/'screenshots'/'result.png'),full_page=True)
        page.set_viewport_size({'width':390,'height':844})
        mobile_overflow=page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
        assert not mobile_overflow, 'Mobile app has horizontal overflow: '+app['id']
        page.screenshot(path=str(ROOT/'apps'/app['id']/'screenshots'/'mobile.png'),full_page=True)
        page.set_viewport_size({'width':1440,'height':1000})
        page.locator('#reset').click()
        assert page.locator('.output-empty').count()==1, 'Reset failed '+app['id']
        page.locator('#prompt').fill('')
        page.locator('#run').click()
        assert 'Add a little context' in page.locator('.error-state').inner_text(), 'Empty-state validation failed '+app['id']
        results.append({'id':app['id'],'system':app['system'],'ui':'PASS','primary_interaction':'PASS','demo_mode':'PASS','mobile_layout':'PASS','real_groq':'NOT TESTED — no local GROQ_API_KEY','desktop':str(dest.relative_to(ROOT)),'result':str((ROOT/'apps'/app['id']/'screenshots'/'result.png').relative_to(ROOT)),'mobile':str((ROOT/'apps'/app['id']/'screenshots'/'mobile.png').relative_to(ROOT)),'screenshot_bytes':dest.stat().st_size})
    page.set_viewport_size({'width':390,'height':844})
    page.goto(BASE,wait_until='networkidle')
    assert page.locator('.app-card').count()==20
    overflow=page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
    results.append({'mobile_catalog':'PASS','mobile_horizontal_overflow':overflow})
    page.set_viewport_size({'width':1440,'height':1000})
    page.goto(BASE+'/#/gallery',wait_until='networkidle')
    assert page.locator('.gallery-card').count()==20,'Gallery should contain exactly 20 apps'
    loaded=page.locator('.gallery-shot img').evaluate_all('imgs => imgs.length === 20 && imgs.every(img => img.complete && img.naturalWidth > 0)')
    assert loaded,'Gallery screenshots did not all load'
    page.screenshot(path=str(ROOT/'outputs'/'design-gallery.png'),full_page=True)
    browser.close()
    (ROOT/'inventory'/'browser-verification.json').write_text(json.dumps({'browser':'Playwright-controlled Google Chrome','apps':results,'console_errors':errors},indent=2)+'\n',encoding='utf8')
    print(json.dumps({'apps':len(apps),'home_screenshot':'outputs/portfolio-home.png','results':results,'console_errors':errors},indent=2))
    if errors: raise SystemExit('Browser reported errors')
