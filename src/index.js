const p = navigator.mediaDevices.getUserMedia({ audio: false, video: true });
p.then((stream) => {
  const video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);
  video.addEventListener('loadedmetadata', e => {
    console.log(e);
    video.play();
  });
});
p.catch(function (e) { console.log(e.name); }); // always check for errors at the end.

