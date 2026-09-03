/**
 * One-off build helper: regenerates favicon.ico and apple-icon.png from
 * the canonical icon at public/icon.png. Run with `node scripts/generate-favicon-assets.mjs`
 * (or `npm run icons:build`).
 *
 * Produces:
 *   - public/favicon.ico       (16/32/48 multi-image ICO)
 *   - public/apple-icon.png    (180x180 explicit Apple touch icon)
 *   - public/icon-192.png      (192x192 Android home-screen icon)
 *   - public/icon-512.png      (512x512 explicit PWA icon)
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const SOURCE = resolve(root, "public/icon.png");

async function main() {
  const src = await readFile(SOURCE);
  const base = sharp(src);

  // 1. favicon.ico — multi-image ICO with 16, 32, 48 sizes
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map(async (size) => {
      return sharp(src)
        .resize(size, size, { fit: "cover" })
        .png()
        .toBuffer();
    }),
  );

  // Build ICO file: header (6 bytes) + per-image dir entries (16 bytes each) + PNG payloads
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirSize = 16 * numImages;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const entries = Buffer.alloc(dirSize);
  for (let i = 0; i < numImages; i++) {
    const sizeVal = sizes[i] === 256 ? 0 : sizes[i];
    const entry = i * 16;
    entries.writeUInt8(sizeVal, entry + 0); // width
    entries.writeUInt8(sizeVal, entry + 1); // height
    entries.writeUInt8(0, entry + 2); // color count
    entries.writeUInt8(0, entry + 3); // reserved
    entries.writeUInt16LE(1, entry + 4); // color planes
    entries.writeUInt16LE(32, entry + 6); // bits per pixel
    entries.writeUInt32LE(pngBuffers[i].length, entry + 8); // image size
    entries.writeUInt32LE(offset, entry + 12); // image offset
    offset += pngBuffers[i].length;
  }

  const ico = Buffer.concat([header, entries, ...pngBuffers]);
  await writeFile(resolve(root, "public/favicon.ico"), ico);
  console.log(`✓ public/favicon.ico (${sizes.join("+")} multi-image, ${ico.length} bytes)`);

  // 2. apple-icon.png — 180x180 for iOS
  await sharp(src)
    .resize(180, 180, { fit: "cover" })
    .png()
    .toBuffer()
    .then((buf) => writeFile(resolve(root, "public/apple-icon.png"), buf));
  console.log(`✓ public/apple-icon.png (180x180)`);

  // 3. icon-192.png — Android home-screen
  await sharp(src)
    .resize(192, 192, { fit: "cover" })
    .png()
    .toBuffer()
    .then((buf) => writeFile(resolve(root, "public/icon-192.png"), buf));
  console.log(`✓ public/icon-192.png (192x192)`);

  // 4. icon-512.png — explicit PWA large icon
  await sharp(src)
    .resize(512, 512, { fit: "cover" })
    .png()
    .toBuffer()
    .then((buf) => writeFile(resolve(root, "public/icon-512.png"), buf));
  console.log(`✓ public/icon-512.png (512x512)`);

  console.log("\nDone. Reload browser to see updated favicons.");
}

main().catch((err) => {
  console.error("Failed to generate favicon assets:", err);
  process.exit(1);
});
