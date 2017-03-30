module.exports = video => {

  const [width, height] = [video.videoWidth, video.videoHeight];

  const gui = createGuiCanvas(width, height);

  const center = { x: Math.floor(width/2), y: Math.floor(height/2) };

  gui.renderTri(center.x, center.y);
  gui.fillRect(center.x - 170, center.y + 70, 100, 60);

  const buffer = new BufferCanvas(width, height);
  setInterval(() => {
    buffer.update(video);

    const borderWidth = 3;
    const picked = buffer.getColor(center.x - 1, center.y - 1, 3, 3);
    console.log(picked);
    gui.fillRect(center.x - 170 + borderWidth, center.y + 70 + borderWidth, 100 - borderWidth*2, 60 - borderWidth*2, `rgb(${picked.r}, ${picked.g}, ${picked.b})`);

  }, 100);

};

function createGuiCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.id = 'ui';

  const style = canvas.style;
  canvas.width = w;
  canvas.height = h;
  style.position = 'absolute';
  style.top = 0;
  style.left = 0;

  document.body.appendChild(canvas);

  return new Canvas(canvas.getContext('2d'));
}

class BufferCanvas {
  constructor(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = 'buffer';
    this.ctx = canvas.getContext('2d');
  }

  update(video) {
    this.ctx.drawImage(video, 0, 0);
  }

  getColor(x, y, w, h) {
    const buf = this.ctx.getImageData(x, y, w, h);
    const color = { r: 0, g: 0, b: 0, a: 0 };
    for (let i = 0; i < buf.data.length; i += 4) {
      color.r += buf.data[i + 0]; // Red
      color.g += buf.data[i + 1]; // Green
      color.b += buf.data[i + 2]; // Blue
      color.a += buf.data[i + 3]; // Alpha
    }
    const cnt = buf.data.length / 4;
    color.r = Math.floor(color.r / cnt);
    color.g = Math.floor(color.g / cnt);
    color.b = Math.floor(color.b / cnt);
    color.a = Math.floor(color.a / cnt);
    return color;
  }

}

class Canvas {
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

  renderTri(centerX, centerY) {
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.lineTo(centerX - 70, centerY + 80);
    this.ctx.lineTo(centerX - 80, centerY + 70);
    this.ctx.lineTo(centerX, centerY);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
