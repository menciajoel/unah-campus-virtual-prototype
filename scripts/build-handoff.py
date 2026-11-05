#!/usr/bin/env python3
"""Build/check an allowlisted design handoff using only Python's standard library."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import re
import sys
import posixpath
from urllib.parse import unquote, urlsplit
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/downloads/UNAH-Campus-Virtual-Design-Handoff.zip'
PREFIX = 'UNAH-Campus-Virtual-Design-Handoff/'
STAMP = (2026, 11, 4, 0, 0, 0)


def contents():
    files = {}
    def add(source, target):
        source = ROOT / source
        if not source.is_file() or source.is_symlink():
            raise ValueError(f'Missing or invalid source: {source.relative_to(ROOT)}')
        files[target] = source.read_bytes()
    add('docs/handoff-README.md', 'README.md')
    add('docs/referencias-visuales.md', '01-REFERENCIAS/README.md')
    for name in ['campus-virtual-desktop.jpg', 'campus-virtual-mobile.png', 'campus-virtual-mobile 2.png', 'campus-virtual-mobile 3.png', 'clases.png']:
        add(f'references/01-REFERENCIAS/{name}', f'01-REFERENCIAS/{name}')
    for name in ['inicio-desktop.jpg', 'mis-cursos-desktop.jpg', 'clase-desktop.jpg', 'mis-cursos-movil.jpg', 'clase-movil.jpg', 'menu-movil.jpg']:
        add(f'references/01-REFERENCIAS/estado-actual/{name}', f'01-REFERENCIAS/estado-actual/{name}')
    for name in ['design-system.md', 'design-tokens.json']:
        add(f'references/02-DESIGN-SYSTEM/{name}', f'02-DESIGN-SYSTEM/{name}')
    for name in ['componentes.md', 'interacciones.md', 'responsive.md', 'criterios-aceptacion.md', 'integracion-moodle.md']:
        add(f'references/03-ESPECIFICACIONES/{name}', f'03-ESPECIFICACIONES/{name}')
    add('docs/developer-handoff.md', '04-IMPLEMENTACION/README.md')
    for source in sorted((ROOT / 'src/css').glob('*.css')):
        add(str(source.relative_to(ROOT)), f'04-IMPLEMENTACION/CSS/{source.name}')
    for name in ['Inter-OFL.txt', 'Font-Awesome-Free.txt', 'welcome-campus-photo.txt']:
        add(f'public/assets/licenses/{name}', f'05-LICENCIAS/{name}')
    manifest = {
        'name': 'UNAH Campus Virtual Design Handoff',
        'designSystemVersion': json.loads(files['02-DESIGN-SYSTEM/design-tokens.json'])['meta']['version'],
        'date': '2026-11-04',
        'documentationRevision': '2026-11-04-r2',
        'manifestCoverage': 'All package files except MANIFEST.json',
        'files': {name: {'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()} for name, data in sorted(files.items())},
    }
    files['MANIFEST.json'] = (json.dumps(manifest, ensure_ascii=False, indent=2) + '\n').encode()
    return files


def validate_documents(files):
    for name, data in files.items():
        if not name.endswith('.md'):
            continue
        text = data.decode('utf-8')
        for link in re.findall(r'\]\(([^)]+)\)', text):
            link = link.strip('<>')
            if urlsplit(link).scheme or link.startswith('#'):
                continue
            target = posixpath.normpath(posixpath.join(posixpath.dirname(name), unquote(urlsplit(link).path)))
            if target not in files and not any(p.startswith(target.rstrip('/') + '/') for p in files):
                raise ValueError(f'Missing documented path in {name}: {link}')
    tokens = json.loads(files['02-DESIGN-SYSTEM/design-tokens.json'])
    for field in ['reference', 'overviewReference']:
        target = tokens['meta'].get(field)
        if target and target not in files:
            raise ValueError(f'Missing token reference: {target}')


def validate(path, expected):
    validate_documents(expected)
    with zipfile.ZipFile(path) as archive:
        if archive.testzip() is not None:
            raise ValueError('Invalid ZIP CRC')
        wanted = {PREFIX + name for name in expected}
        if set(archive.namelist()) != wanted or len(archive.namelist()) != len(wanted):
            raise ValueError('ZIP contains missing, duplicate or unexpected files')
        for info in archive.infolist():
            name = PurePosixPath(info.filename)
            if name.is_absolute() or '..' in name.parts or any(p.startswith('.') for p in name.parts):
                raise ValueError('Unsafe ZIP path')
            relative = info.filename.removeprefix(PREFIX)
            data = archive.read(info)
            if data != expected[relative]:
                raise ValueError(f'Outdated ZIP entry: {relative}')
            if re.search(rb'/Users/|/var/folders/|\.codex/|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}', data):
                raise ValueError(f'Private path or credential pattern in {relative}')
    return {'file': OUTPUT.relative_to(ROOT).as_posix(), 'files': len(expected), 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'valid': True}


def main():
    expected = contents()
    if '--check' not in sys.argv:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(OUTPUT, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
            for name, data in sorted(expected.items()):
                info = zipfile.ZipInfo(PREFIX + name, date_time=STAMP)
                info.compress_type = zipfile.ZIP_DEFLATED
                info.create_system = 3
                info.external_attr = 0o100644 << 16
                archive.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    result = validate(OUTPUT, expected)
    checksum = f"{result['sha256']}  {OUTPUT.name}\n"
    sidecar = OUTPUT.with_suffix('.zip.sha256')
    if '--check' in sys.argv:
        if not sidecar.is_file() or sidecar.read_text() != checksum:
            raise ValueError('ZIP checksum sidecar is outdated')
    else:
        sidecar.write_text(checksum)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
