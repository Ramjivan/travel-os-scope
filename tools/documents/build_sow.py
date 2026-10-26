"""Render the client SOW source to a paginated PDF using bundled Python.

Run from the repository root. No application data or source systems are read.
"""
from pathlib import Path
import re
import html
import json

from reportlab.pdfgen import canvas
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
    LongTable, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'docs/client/travel-os-sow-v0.1.md'
OUTPUT = ROOT / 'output/pdf/travel-os-sow-v0.1.pdf'
WIDTH, HEIGHT = A4
MARGIN = 52
CONTENT_WIDTH = WIDTH - 2 * MARGIN

def register_fonts():
    fonts = Path('C:/Windows/Fonts')
    for name, filename in [('Body', 'arial.ttf'), ('BodyBold', 'arialbd.ttf'),
                           ('BodyItalic', 'ariali.ttf'), ('BodyBoldItalic', 'arialbi.ttf')]:
        pdfmetrics.registerFont(TTFont(name, str(fonts / filename)))
    pdfmetrics.registerFontFamily('Body', normal='Body', bold='BodyBold',
                                 italic='BodyItalic', boldItalic='BodyBoldItalic')

def inline(text):
    text = html.escape(text.strip())
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)

class SOWDocument(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)
        self.addPageTemplates(PageTemplate(
            id='body', frames=Frame(MARGIN, 54, CONTENT_WIDTH, HEIGHT - 109,
                                    leftPadding=0, rightPadding=0,
                                    topPadding=0, bottomPadding=0),
            onPage=self.page_footer,
        ))

    def page_footer(self, canv, doc):
        canv.saveState()
        canv.setFont('Body', 8)
        canv.setFillColor(colors.HexColor('#536174'))
        canv.drawString(MARGIN, 33, 'Travel OS   |   TOS-SOW-001   |   Version 0.1   |   Client review')
        canv.drawRightString(WIDTH - MARGIN, 33, f'Page {doc.page}')
        canv.restoreState()

    def afterFlowable(self, flowable):
        if (isinstance(flowable, Paragraph) and flowable.style.name == 'Section'
                and re.match(r'^\d+ ', flowable.getPlainText())):
            title = flowable.getPlainText()
            key = 'section_' + re.sub(r'[^a-zA-Z0-9]+', '_', title)
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title, key, level=0, closed=False)
            self.notify('TOCEntry', (0, title, self.page, key))

def styles():
    base = getSampleStyleSheet()
    base.add(ParagraphStyle('BodyTextSOW', fontName='Body', fontSize=10.3,
                           leading=14.1, spaceAfter=8, textColor=colors.HexColor('#20252C'),
                           allowWidows=0, allowOrphans=0))
    base.add(ParagraphStyle('SOWTitle', fontName='BodyBold', fontSize=27,
                           leading=32, textColor=colors.black, spaceAfter=24))
    base.add(ParagraphStyle('Section', fontName='BodyBold', fontSize=18,
                           leading=23, textColor=colors.HexColor('#172A44'),
                           spaceAfter=15, keepWithNext=True))
    base.add(ParagraphStyle('Subheading', fontName='BodyBold', fontSize=12,
                           leading=16, spaceAfter=10, keepWithNext=True))
    base.add(ParagraphStyle('Cell', fontName='Body', fontSize=9.1, leading=12.1,
                           spaceAfter=0, textColor=colors.HexColor('#20252C')))
    base.add(ParagraphStyle('HeaderCell', parent=base['Cell'], fontName='BodyBold',
                           textColor=colors.HexColor('#172A44')))
    base.add(ParagraphStyle('ListSOW', parent=base['BodyTextSOW'],
                           leftIndent=10, firstLineIndent=-8, spaceAfter=7))
    base.add(ParagraphStyle('TOCSOW', fontName='Body', fontSize=10,
                           leading=14.3, spaceBefore=0, spaceAfter=3))
    return base

def table(block, st):
    rows = [[part.strip() for part in line.strip().strip('|').split('|')] for line in block]
    rows = [r for r in rows if not all(re.fullmatch(r':?-+:?', c) for c in r)]
    count = len(rows[0])
    if count == 2:
        widths = [CONTENT_WIDTH * .35, CONTENT_WIDTH * .65]
        if rows[0][0] == 'Client approval':
            widths = [CONTENT_WIDTH / 2] * 2
    elif count == 3:
        ratios = [.25, .49, .26]
        if rows[0][0] == 'ID': ratios = [.10, .66, .24]
        if rows[0][0] == 'Phase': ratios = [.14, .39, .47]
        if rows[0][0] == 'Role group': ratios = [.24, .36, .4]
        widths = [CONTENT_WIDTH * n for n in ratios]
    elif count == 4:
        widths = [CONTENT_WIDTH * n for n in [.19, .49, .1, .22]]
    else:
        widths = [CONTENT_WIDTH / count] * count
    data = [[Paragraph(inline(c), st['HeaderCell'] if i == 0 else st['Cell'])
             for c in row] for i, row in enumerate(rows)]
    t = LongTable(data, colWidths=widths, repeatRows=1, hAlign='LEFT',
                  spaceBefore=3, spaceAfter=13)
    padding = (3.5 if rows[0][0] == 'ID' else 2.8 if rows[0][0] == 'Case'
               else 4 if rows[0][0] == 'Role group' else 6)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EAF0F6')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), padding),
        ('BOTTOMPADDING', (0, 0), (-1, -1), padding),
        ('LINEBELOW', (0, 0), (-1, 0), .6, colors.HexColor('#C9D4DF')),
        ('LINEBELOW', (0, 1), (-1, -1), .35, colors.HexColor('#DCE3EB')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
    ]))
    return t

def build():
    register_fonts()
    st = styles()
    text = SOURCE.read_text(encoding='utf-8')
    lines = text.splitlines()
    story = []
    first_section = True
    buffer = []
    def flush():
        if buffer:
            story.append(Paragraph(inline(' '.join(buffer)), st['BodyTextSOW']))
            buffer.clear()
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith('# '):
            flush()
            story.extend([Spacer(1, 15), Paragraph(inline(line[2:]), st['SOWTitle'])])
        elif line.startswith('## '):
            flush()
            heading = line[3:]
            if heading == 'Document control':
                story.append(Paragraph(heading, st['Subheading']))
            else:
                story.append(PageBreak())
                if first_section:
                    story.append(Paragraph('Contents', st['Section']))
                    story.append(Paragraph('The section numbers identify the scope and schedules. Requirement codes identify individual delivery and acceptance items.', st['BodyTextSOW']))
                    toc = TableOfContents()
                    toc.levelStyles = [st['TOCSOW']]
                    story.append(toc)
                    story.append(PageBreak())
                    first_section = False
                story.append(Paragraph(inline(heading), st['Section']))
        elif line.startswith('|'):
            flush()
            block = []
            while i < len(lines) and lines[i].startswith('|'):
                block.append(lines[i])
                i += 1
            story.append(table(block, st))
            continue
        elif line.startswith('- '):
            flush()
            story.append(Paragraph('- ' + inline(line[2:]), st['ListSOW']))
        elif not line.strip():
            flush()
        elif line.endswith('  '):
            flush()
            story.append(Paragraph(inline(line), st['BodyTextSOW']))
        else:
            buffer.append(line)
        i += 1
    flush()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SOWDocument(str(OUTPUT), pagesize=A4, title='Travel OS Scope of Work',
                      author='Travel OS', subject='Three phase project scope and commercial baseline',
                      leftMargin=MARGIN, rightMargin=MARGIN, topMargin=55, bottomMargin=54)
    doc.multiBuild(story)
    reader = PdfReader(str(OUTPUT))
    req_ids = re.findall(r'^\*\*([A-Z]+-\d+)\*\*', text, flags=re.M)
    if len(req_ids) != len(set(req_ids)):
        raise ValueError('Duplicate requirement identifiers')
    extracted = '\n'.join(p.extract_text() or '' for p in reader.pages)
    absent = [rid for rid in req_ids if rid not in extracted]
    if absent:
        raise ValueError(f'Missing PDF requirements: {absent}')
    audit = {
        'output': str(OUTPUT), 'pages': len(reader.pages), 'requirements': len(req_ids),
        'sections': len(re.findall(r'^## \d+ ', text, flags=re.M)),
        'source_words': len(text.split()), 'requirements_unique': True,
        'requirements_present_in_pdf': True,
        'page_character_counts': [len(p.extract_text() or '') for p in reader.pages],
    }
    print(json.dumps(audit, indent=2))

if __name__ == '__main__':
    build()
