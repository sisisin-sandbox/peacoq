module.exports = video => {
  
  const [width, height] = [video.videoWidth, video.videoHeight];

  const canvas = document.createElement('canvas');
  const buffer = document.createElement('canvas');
  canvas.id = 'ui';
  buffer.id = 'buffer';
  buffer.width = width;
  buffer.height = height;

  var bufferCtx = buffer.getContext('2d');

  const style = canvas.style;
  canvas.width = width;
  canvas.height = height;
  style.position = 'absolute';
  style.top = 0;
  style.left = 0;

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  (function strokeTri() {
    const center = { x: width/2, y: height/2 };
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(center.x - 70, center.y + 80);
    ctx.lineTo(center.x - 80, center.y + 70);
    ctx.lineTo(center.x, center.y);
    ctx.closePath();
    ctx.fill();
  })();
  setInterval(() => {
    bufferCtx.drawImage(video, 0, 0);
    const x = Math.floor(width/2)-1;
    const y = Math.floor(height/2)-1;
    const buf = bufferCtx.getImageData(x, y, 3, 3);
    const c = {r:0,g:0,b:0};
    for (var i = 0; i < buf.data.length; i += 4) {
      c.r += buf.data[i + 0]; // Red
      c.g += buf.data[i + 1]; // Green
      c.b += buf.data[i + 2]; // Blue
      // c.r += buf.data[i + 3];                     // Alpha
    }
    c.r = Math.floor(c.r/9);
    c.g = Math.floor(c.g/9);
    c.b = Math.floor(c.b/9);
    (function strokeSq() {
      const center = { x: width/2, y: height/2 };
      const fillRect = (x, y, w, h) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
      };
      ctx.clearRect(center.x - 120, center.y + 70, 50, 30);
      ctx.fillStyle = 'rgb(0, 0, 0)';
      fillRect(center.x - 120, center.y + 70, 50, 30);
      const color = `rgb(${c.r}, ${c.g}, ${c.b})`;
      console.log(color);
      ctx.fillStyle = color;
      const borderWidth = 3;
      fillRect(center.x - 120 + borderWidth, center.y + 70 + borderWidth, 50 - borderWidth*2, 30 - borderWidth*2);

    })();
  }, 100);


};
