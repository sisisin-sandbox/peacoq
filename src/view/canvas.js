module.exports.Canvas = class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  strokeRect(x, y, w, h, c) {
    this.ctx.strokeStyle = c ? this.rgb(c) : this.rgb({r:0, g:0, b:0});
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  fillRect(x, y, w, h, c) {
    this.ctx.fillStyle = c ? this.rgb(c) : this.rgb({r:0, g:0, b:0});
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  fillText(text, x, y, len, font) {
    if (!!font) {
      this.ctx.font = font;
    }
    this.ctx.fillStyle = this.rgb({r:255, g:255, b:255});
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y, len);
  }

  rgb(c) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
}
