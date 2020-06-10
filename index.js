function drowFull (size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size, size, size, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function drowSlise (radius, part, color) {
  console.log(part, color)
  const angle = Math.PI * 2 * part;
  if (angle === 0) {
    drowFull(radius, color);
    return;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(radius, 0);

  if (angle < Math.PI) {
    ctx.lineTo(radius * 2, 0);
    ctx.lineTo(radius * 2, radius - (radius / Math.tan(angle)));
  } else {
    ctx.lineTo(radius * 2, 0);
    ctx.lineTo(radius * 2, radius * 2);
    ctx.lineTo(0, radius * 2);
    ctx.lineTo(0, radius + (radius / Math.tan(angle)));
  }

  ctx.lineTo(radius, radius);
  ctx.closePath();
  ctx.fill();
}

function drowDiagram(radius, parts) {
  const { value: lastValue, color: lastColor } = parts[parts.length - 1];
  drowSlise(radius, 0, lastColor);
  let currentPart = 1 - lastValue;
  for (let i = parts.length - 1; i--; i >= 0) {
    const { value, color } = parts[i];
    drowSlise(radius, currentPart, color);
    currentPart -= value;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const size = parseInt(canvas.clientWidth / 2);

const parts = [
  { value: 1 / 6, color: 'green' },
  { value: 1 / 4, color: 'orange' },
  { value: 1 / 4, color: 'yellow' },
  { value: 1 / 3, color: 'blue' },
]

drowDiagram(size, parts)
