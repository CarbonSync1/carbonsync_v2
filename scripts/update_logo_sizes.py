import re

with open(r'c:\Users\Sarwang\carbonSync_v2\carbonSync_v2\src\components\NetZeroApp.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Sizes map: old -> new
size_map = {
    'w-6 h-6': 'w-10 h-10',    # from 24px to 40px
    'w-8 h-8': 'w-12 h-12',    # from 32px to 48px
    'w-10 h-10': 'w-14 h-14',  # from 40px to 56px
    'w-12 h-12': 'w-16 h-16',  # from 48px to 64px
}

def replace_size(match):
    img_tag = match.group(0)
    for old, new in size_map.items():
        if old in img_tag:
            return img_tag.replace(old, new)
    return img_tag

content = re.sub(r'<img src="/logo\.webp" [^>]+>', replace_size, content)

with open(r'c:\Users\Sarwang\carbonSync_v2\carbonSync_v2\src\components\NetZeroApp.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
