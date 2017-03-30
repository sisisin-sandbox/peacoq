const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  video.src = window.URL.createObjectURL(stream);

  setInterval(() => {
    ctx.getImageData(0, 0, 1280, 720);
    ctx.drawImage(video, 0, 0);
    // document.querySelector('img').src = canvas.toDataURL('image/webp');
  }, 100);
});
p.catch(e => console.log(e.name));
