import json

with open('catalog/products.json', encoding='utf-8') as f:
    data = json.load(f)

categories = data['categories']
products = data['products']

lines = []
lines.append("-- ============================================================================")
lines.append("-- MSP PYRO PARK CRACKERS E-COMMERCE DATABASE SEED (2026 CATALOG)")
lines.append("-- Flyway Migration: V2__seed_catalog_2026.sql")
lines.append("-- ============================================================================\n")

# Seed Categories
lines.append("-- 1. Seed Categories")
for c in categories:
    name_esc = c['name'].replace("'", "''")
    tamil_esc = c['tamil'].replace("'", "''")
    desc_esc = c['description'].replace("'", "''")
    slug_esc = c['slug'].replace("'", "''")
    lines.append(f"INSERT INTO categories (id, slug, name, tamil_name, description, sort_order) VALUES ({c['id']}, '{slug_esc}', '{name_esc}', '{tamil_esc}', '{desc_esc}', {c['id']}) ON DUPLICATE KEY UPDATE name=VALUES(name);")

lines.append("\n-- 2. Seed Products (131 Items from MSP Retail List 2026.pdf)")

cat_map = {c['slug']: c['id'] for c in categories}

for p in products:
    cat_id = cat_map[p['category']]
    name_esc = p['name'].replace("'", "''")
    tamil_esc = p['tamil'].replace("'", "''")
    slug_esc = p['slug'].replace("'", "''")
    pack_esc = p['pack'].replace("'", "''")
    pieces_esc = p['pieces'].replace("'", "''")
    list_price_str = f"{p['listPrice']:.2f}" if p['listPrice'] is not None else "NULL"
    net_price_str = f"{p['netPrice']:.2f}" if p['netPrice'] is not None else "NULL"
    disc_str = str(p['discountPercent']) if p['discountPercent'] is not None else "NULL"
    is_gift = "TRUE" if p.get('isGiftPack') else "FALSE"
    item_count_str = str(p['itemCount']) if p.get('itemCount') is not None else "NULL"
    status_esc = p['status'].replace("'", "''")
    notes_esc = p.get('notes', '').replace("'", "''") if p.get('notes') else "NULL"
    if notes_esc != "NULL":
        notes_esc = f"'{notes_esc}'"

    lines.append(
        f"INSERT INTO products (product_code, slug, name, tamil_name, category_id, pack_unit, pieces_count, list_price, selling_price, discount_percentage, is_gift_pack, item_count, source_page, verification_status, verification_notes) "
        f"VALUES ({p['code']}, '{slug_esc}', '{name_esc}', '{tamil_esc}', {cat_id}, '{pack_esc}', '{pieces_esc}', {list_price_str}, {net_price_str}, {disc_str}, {is_gift}, {item_count_str}, {p['page']}, '{status_esc}', {notes_esc}) "
        f"ON DUPLICATE KEY UPDATE selling_price=VALUES(selling_price);"
    )

with open('database/migrations/V2__seed_catalog_2026.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("Generated database/migrations/V2__seed_catalog_2026.sql successfully!")
