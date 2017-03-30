const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('.camera');
  video.src = window.URL.createObjectURL(stream);

  record(stream);
});
p.catch(e => console.log(e.name));

function record(stream) {
  let recorder;
  let blobUrl;
  document.querySelector('.record-start').addEventListener('click', e => {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.addEventListener('dataavailable', e => {
      blobUrl = window.URL.createObjectURL(new Blob([e.data], { type: e.data.type }));
    });
  });
  document.querySelector('.record-end').addEventListener('click', e => {
    recorder.stop();
  });
  document.querySelector('.play-start').addEventListener('click', e => {
    const v = document.querySelector('.play');
    v.src = blobUrl;
    v.addEventListener('ended', e => {
      v.pause();
      v.src = '';
    });
    v.play();
  });
};
