const view = require('./view/view');

const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);

  video.addEventListener('loadedmetadata', () => {
    console.log(video.videoHeight)
    view(video);
  });
});
p.catch(e => console.log(e.name));
