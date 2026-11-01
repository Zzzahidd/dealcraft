import re

with open(r'c:\Users\zahid\Desktop\Dekstop test\sales-crm-main\data\companies.ts', 'r', encoding='utf-8') as f:
    ts = f.read()

idx_owners = ts.find('const OWNER_NAMES = [')
idx_end = ts.find('export const SORT_OPTIONS = [')
block = ts[idx_owners:idx_end]

block = re.sub(r' as const;', ';', block)
block = re.sub(r':\s*Omit<Company,\s*"logo">\[\]', '', block)
block = re.sub(r':\s*Company\[\]', '', block)

with open(r'c:\Users\zahid\Desktop\Dekstop test\gr8r-studio-desktop\src\data\companies.js', 'r', encoding='utf-8') as f:
    target = f.read()

target = target.replace('export const OWNER_NAMES = [];', '')
target = target.replace('export const OWNERS = [];', '')
target = target.replace('export const COMPANIES = [];', block)

with open(r'c:\Users\zahid\Desktop\Dekstop test\gr8r-studio-desktop\src\data\companies.js', 'w', encoding='utf-8') as f:
    f.write(target)
print('Updated companies.js successfully!')
