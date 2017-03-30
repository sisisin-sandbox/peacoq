const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('.camera');
  video.src = window.URL.createObjectURL(stream);
  record(video, stream);
});
p.catch(e => console.log(e.name));

function record(video, stream) {
  let recorder;
  let blob;
  document.querySelector('.start').addEventListener('click', e => {
    const canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.getImageData(0, 0, 1280, 720);
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
      fetchFaceApi(blob);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const storageKeyName = 'face-api-key';
  document.querySelector('.api-key').value = localStorage.getItem(storageKeyName);
  document.querySelector('.save-key').addEventListener('click', e => {
    localStorage.setItem(storageKeyName, document.querySelector('.api-key').value);
  });
})

function fetchFaceApi(imageBlob) {
  window.headers = new Headers();
  headers.append('Ocp-Apim-Subscription-Key', document.querySelector('.api-key').value);
  headers.append('Content-Type', 'application/octet-stream');

  fetch('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceLandmarks=true&returnFaceAttributes=age,gender', { method: 'POST', headers, body: imageBlob })
    .then(res => res.json())
    .then(body => {
      console.log(body);
    })
}
