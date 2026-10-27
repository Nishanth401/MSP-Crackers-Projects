import pypdf
import json
import csv
import re

reader = pypdf.PdfReader('catalog/MSP retail list 2026.pdf')

def get_rows(page, tolerance=4.0):
    parts = []
    def visitor(text, cm, tm, font_dict, font_size):
        if text.strip():
            parts.append((tm[4], tm[5], text.strip()))
    page.extract_text(visitor_text=visitor)
    
    rows = []
    for x, y, text in sorted(parts, key=lambda item: (-item[1], item[0])):
        placed = False
        for r in rows:
            if abs(r['y'] - y) <= tolerance:
                r['items'].append((x, text))
                placed = True
                break
        if not placed:
            rows.append({'y': y, 'items': [(x, text)]})
            
    for r in rows:
        r['items'].sort(key=lambda it: it[0])
    return rows

for page_idx in range(1, 6):
    print(f'=== PAGE {page_idx+1} ROWS ===')
    rows = get_rows(reader.pages[page_idx])
    for r in rows:
        row_str = ' | '.join(f"({x:0.1f}) {t}" for x, t in r['items'])
        print(f"y={r['y']:0.1f}: {row_str}")
