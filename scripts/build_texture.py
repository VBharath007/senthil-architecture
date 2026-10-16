import random
import math
from PIL import Image, ImageOps, ImageFilter

def make_feathered_mask(w, h, feather=15):
    mask = Image.new('L', (w, h), 0)
    for y in range(h):
        for x in range(w):
            dx = min(x, w - 1 - x)
            dy = min(y, h - 1 - y)
            d = min(dx, dy)
            if d >= feather:
                val = 255
            else:
                val = int(255 * (0.5 - 0.5 * math.cos(math.pi * d / feather)))
            mask.putpixel((x, y), val)
    return mask

def generate():
    random.seed(42)
    p1 = Image.open('public/images/patch1.png').convert('RGB')
    p2 = Image.open('public/images/patch2.png').convert('RGB')
    p3 = Image.open('public/images/patch3.png').convert('RGB')
    p4 = Image.open('public/images/patch4.png').convert('RGB')

    blocks = []
    # Extract variety of blocks with small flips to eliminate directional bias
    for x in range(0, p1.width - 55, 25):
        b = p1.crop((x, 0, x + 55, 60))
        blocks.append(b)
        blocks.append(ImageOps.mirror(b))
        blocks.append(ImageOps.flip(b))

    for x in range(0, p2.width - 30, 20):
        b = p2.crop((x, 0, x + 30, 30))
        blocks.append(b)
        blocks.append(ImageOps.mirror(b))

    # Base canvas initialized with mean background color #EDEDED (237, 237, 237)
    out_w, out_h = 1600, 1200
    canvas = Image.new('RGB', (out_w, out_h), (237, 237, 237))

    step = 28
    for y in range(-30, out_h + 30, step):
        for x in range(-30, out_w + 30, step):
            blk = random.choice(blocks)
            bw, bh = blk.size
            mask = make_feathered_mask(bw, bh, feather=min(14, bw//2 - 1, bh//2 - 1))
            
            # Place block
            canvas.paste(blk, (x, y), mask)

    # Now make the canvas seamlessly tileable using toroidal edge wrapping
    margin = 120
    # Left-right toroidal wrap
    left_strip = canvas.crop((0, 0, margin, out_h))
    right_mask = Image.new('L', (margin, out_h))
    for x in range(margin):
        alpha = int(255 * (1.0 - x / margin))
        for y in range(out_h):
            right_mask.putpixel((x, y), alpha)
    canvas.paste(left_strip, (out_w - margin, 0), right_mask)

    # Top-bottom toroidal wrap
    top_strip = canvas.crop((0, 0, out_w, margin))
    bottom_mask = Image.new('L', (out_w, margin))
    for y in range(margin):
        alpha = int(255 * (1.0 - y / margin))
        for x in range(out_w):
            bottom_mask.putpixel((x, y), alpha)
    canvas.paste(top_strip, (0, out_h - margin), bottom_mask)

    # Save high-res webp and png
    canvas.save('public/images/weathered-paper-texture.webp', 'WEBP', quality=95)
    canvas.save('public/images/weathered-paper-texture.png', 'PNG')
    print('Generated weathered-paper-texture (1600x1200)')

    # Check stats
    r_vals = [canvas.getpixel((x, y))[0] for x in range(0, out_w, 20) for y in range(0, out_h, 20)]
    mean_val = sum(r_vals) / len(r_vals)
    std_val = math.sqrt(sum((v - mean_val)**2 for v in r_vals) / len(r_vals))
    print(f'Mean lightness: {mean_val:.2f}, Std dev (cloudiness/contrast): {std_val:.2f}, Min: {min(r_vals)}, Max: {max(r_vals)}')

if __name__ == '__main__':
    generate()
