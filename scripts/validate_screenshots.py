from pathlib import Path
import json, struct

root = Path(__file__).resolve().parents[1]
files = list((root / 'apps').glob('*/screenshots/*.png'))
files += list((root / 'outputs').glob('*.png'))
results = []
for file in sorted(files):
    data = file.read_bytes()
    valid = len(data) > 24 and data[:8] == b'\x89PNG\r\n\x1a\n' and data[12:16] == b'IHDR'
    width, height = struct.unpack('>II', data[16:24]) if valid else (0, 0)
    results.append({'path': str(file.relative_to(root)), 'valid_png': valid, 'width': width, 'height': height, 'bytes': len(data)})
bad = [item for item in results if not item['valid_png'] or item['bytes'] == 0]
(root / 'inventory' / 'screenshot-validation.json').write_text(json.dumps({'images': len(results), 'valid': len(results)-len(bad), 'invalid': bad, 'files': results}, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'images': len(results), 'valid': len(results)-len(bad), 'invalid': len(bad)}))
if bad: raise SystemExit(1)
