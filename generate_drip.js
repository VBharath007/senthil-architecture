const fs = require('fs');

const width = 1200;
const height = 400;

// The path covers the bottom area to make it B&W
let path = `M 0,${height} L ${width},${height} L ${width},0 `;

const drips = [];
let x = width;

while (x > 0) {
  const dripWidth = 20 + Math.random() * 60; // gap width
  const peakWidth = 15 + Math.random() * 30; // peak width between gaps

  const isLong = Math.random() > 0.8;
  const dripDepth = isLong ? 150 + Math.random() * 150 : 30 + Math.random() * 70;

  drips.push({
    xStart: x,
    xEnd: Math.max(0, x - dripWidth),
    depth: dripDepth,
    peakWidth: peakWidth
  });

  x -= (dripWidth + peakWidth);
}

if (drips[drips.length - 1].xEnd !== 0) {
  drips[drips.length - 1].xEnd = 0;
}

for (let i = 0; i < drips.length; i++) {
  const drip = drips[i];
  const cx = (drip.xStart + drip.xEnd) / 2;
  const w = drip.xStart - drip.xEnd;

  // Downward curve for the drip gap
  path += ` C ${drip.xStart},${drip.depth * 0.2} ${cx + w / 3},${drip.depth} ${cx},${drip.depth} `;
  path += ` C ${cx - w / 3},${drip.depth} ${drip.xEnd},${drip.depth * 0.2} ${drip.xEnd},0 `;

  // Line to the next drip start
  if (i < drips.length - 1) {
    path += ` L ${drips[i + 1].xStart},0 `;
  }
}

path += ` Z `; // Close the main path

// Detached droplets (transparent holes)
const numDroplets = 25;
for (let i = 0; i < numDroplets; i++) {
  const dropX = Math.random() * width;
  const dropY = 60 + Math.random() * 300;
  const r = 2 + Math.random() * 6;

  path += ` M ${dropX - r},${dropY} A ${r},${r} 0 1,0 ${dropX + r},${dropY} A ${r},${r} 0 1,0 ${dropX - r},${dropY} Z `;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
  <path fill="black" fill-rule="evenodd" d="${path}" />
</svg>`;

fs.writeFileSync('public/drip-mask.svg', svg);
console.log('Generated public/drip-mask.svg');
