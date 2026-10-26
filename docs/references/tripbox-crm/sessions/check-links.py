from pathlib import Path
import re, urllib.parse
root=Path(__file__).resolve().parents[4]
targets=list((root/'docs/references/tripbox-crm').rglob('*.md'))
targets += [root/p for p in ['docs/README.md','docs/references/README.md','docs/development/current-state.md','docs/feedback/README.md','CHANGELOG.md']]
issues=[]
count=0
for file in targets:
    content=file.read_text(encoding='utf-8')
    content=re.sub(r'```[\s\S]*?```','',content)
    content=re.sub(r'`[^`]+`','',content)
    for match in re.finditer(r'\]\(([^)]+)\)',content):
        url=match.group(1).strip().strip('<>')
        if re.match(r'^[a-zA-Z][\w+.-]*:',url) or url.startswith('#'):continue
        url=urllib.parse.unquote(url.split('#')[0])
        target=(file.parent/url).resolve()
        count+=1
        if not target.exists(): issues.append({'file':str(file.relative_to(root)),'link':url})
print('Checked',count,'local links in',len(targets),'Markdown files')
print(issues)
raise SystemExit(bool(issues))
