module.exports.Canvas = class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  fillRect(x, y, w, h, c) {
    this.ctx.fillStyle = c || 'rgb(0, 0, 0)';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  fillText(text, x, y, len) {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y, len);
  }
}
