export default function drawDiagram(ctx, radius, parts) {
  const { value: lastValue, color: lastColor } = parts[parts.length - 1];
  drawSlise(ctx, radius, 0, lastColor);
  let currentPart = 1 - lastValue;
  for (let i = parts.length - 1; i--; i >= 0) {
    const { value, color } = parts[i];
    drawSlise(ctx, radius, currentPart, color);
    currentPart -= value;
  }
}

function drawFull (ctx, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size, size, size, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function drawSlise (ctx, radius, part, color) {
  const angle = Math.PI * 2 * part;
  if (angle === 0) {
    drawFull(ctx, radius, color);
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
