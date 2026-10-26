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
    page.on('response',lambda r: errors.append(f'HTTP {r.status}: {r.url}') if r.status>=400 and '/api/run' not in r.url else None)  # /api/run failures are handled by the explicit retry flow above.
    page.goto(BASE,wait_until='networkidle',timeout=30000)
    page.screenshot(path=str(ROOT/'outputs'/'portfolio-home.png'),full_page=True)
    page.screenshot(path=str(ROOT/'outputs'/'agent-directory.png'),full_page=True)
    assert page.locator('.app-card').count()==20, 'Catalog must show 20 cards'
    page.locator('#search').fill('sql')
    assert page.locator('.app-card').count()==2 and 'Database Query Helper' in page.locator('.app-card h3').all_text_contents(), 'Search should find task names and examples'
    page.locator('#search').fill('')
    page.locator('#filter').select_option(label='Research')
    assert page.locator('.app-card').count()==4, 'Research task category should show 4 cards'
    page.locator('#filter').select_option(label='All tasks')
    results=[]
    from time import sleep
    for app in apps:
        page.goto(f'{BASE}/#/{app["id"]}',wait_until='networkidle',timeout=30000)
        page.wait_for_selector('.task-panel textarea')
        assert page.locator('h1').inner_text().startswith(app['name']), 'Title mismatch '+app['id']
        dest=ROOT/'apps'/app['id']/'screenshots'/'desktop.png'
        page.screenshot(path=str(dest),full_page=True)
        # Real Groq run: the result screenshot must show an actual labeled AI response.
        page.locator('#mode').select_option('groq')
        page.locator('#prompt').fill(app['prompt'])
        groq_model=None
        for attempt in range(3):
            page.locator('#run').click()
            page.locator('#result .groq-fields, #result .error-state').wait_for(timeout=40000)
            if page.locator('#result .groq-fields').count()==1:
                groq_label=page.locator('.result-label').inner_text()
                assert groq_label.startswith('GROQ RESPONSE'), 'Groq response must be labeled '+app['id']
                assert page.locator('.groq-fields section').count()>=1, 'Empty Groq output '+app['id']
                groq_model=groq_label.replace('GROQ RESPONSE · ','').strip()
                break
            error_text=page.locator('.error-state').inner_text()
            if 'rate limit' in error_text.lower() and attempt<2:
                page.wait_for_timeout(15000)  # Groq rate limits recover; retry honestly.
                continue
            raise AssertionError(f'Groq run failed for {app["id"]}: {error_text[:160]}')
        assert groq_model, 'Groq run never succeeded '+app['id']
        page.screenshot(path=str(ROOT/'apps'/app['id']/'screenshots'/'result.png'),full_page=True)
        page.set_viewport_size({'width':390,'height':844})
        mobile_overflow=page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
        assert not mobile_overflow, 'Mobile app has horizontal overflow: '+app['id']
        page.screenshot(path=str(ROOT/'apps'/app['id']/'screenshots'/'mobile.png'),full_page=True)
        page.set_viewport_size({'width':1440,'height':1000})
        # Provenance check: demo mode must never be presented as a real AI response.
        page.locator('#mode').select_option('demo')
        page.locator('#run').click()
        page.locator('.result-text').wait_for(timeout=6000)
        assert 'SAMPLE RESULT' in page.locator('.result-label').inner_text(), 'Sample source must be labeled '+app['id']
        page.locator('#reset').click()
        assert page.locator('.output-empty').count()==1, 'Reset failed '+app['id']
        page.locator('[data-history]').first.click()
        page.locator('.result-box.has-output').wait_for(timeout=6000)
        assert page.locator('#prompt').input_value()==app['prompt'], 'Saved input did not restore'
        page.locator('#reset').click()
        page.locator('#prompt').fill('')
        page.locator('#run').click()
        assert 'Add a little context' in page.locator('.error-state').inner_text(), 'Empty-state validation failed '+app['id']
        results.append({'id':app['id'],'system':app['system'],'ui':'PASS','primary_interaction':'PASS','demo_mode':'PASS','mobile_layout':'PASS','real_groq':'PASS — live Groq response rendered and labeled '+groq_model,'desktop':str(dest.relative_to(ROOT)),'result':str((ROOT/'apps'/app['id']/'screenshots'/'result.png').relative_to(ROOT)),'mobile':str((ROOT/'apps'/app['id']/'screenshots'/'mobile.png').relative_to(ROOT)),'screenshot_bytes':dest.stat().st_size})
        sleep(2)
    page.set_viewport_size({'width':390,'height':844})
    page.goto(BASE,wait_until='networkidle')
    assert page.locator('.app-card').count()==20
    overflow=page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
    results.append({'mobile_catalog':'PASS','mobile_horizontal_overflow':overflow})
    page.set_viewport_size({'width':1440,'height':1000})
    page.goto(BASE+'/#/about',wait_until='networkidle')
    assert 'Created by Youssef Alaa' in page.locator('#view').inner_text()
    page.goto(BASE+'/#/gallery',wait_until='networkidle')
    assert page.locator('.gallery-card').count()==20,'Gallery should contain exactly 20 apps'
    loaded=page.locator('.gallery-shot img').evaluate_all('imgs => imgs.length === 20 && imgs.every(img => img.complete && img.naturalWidth > 0)')
    assert loaded,'Gallery screenshots did not all load'
    page.screenshot(path=str(ROOT/'outputs'/'design-gallery.png'),full_page=True)
    browser.close()
    (ROOT/'inventory'/'browser-verification.json').write_text(json.dumps({'browser':'Playwright-controlled Google Chrome','apps':results,'console_errors':errors},indent=2)+'\n',encoding='utf8')
    print(json.dumps({'apps':len(apps),'home_screenshot':'outputs/portfolio-home.png','results':results,'console_errors':errors},indent=2))
    if errors: raise SystemExit('Browser reported errors')
