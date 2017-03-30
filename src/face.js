const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('.camera');
  video.src = window.URL.createObjectURL(stream);
  record(stream);
});
p.catch(e => console.log(e.name));

function record(stream) {
  let recorder;
  let blob;
  document.querySelector('.record-start').addEventListener('click', e => {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.addEventListener('dataavailable', e => {
      blob = new Blob([e.data], { type: e.data.type });
    });
  });
  document.querySelector('.record-end').addEventListener('click', e => {
    recorder.stop();
  });
  document.querySelector('.play-start').addEventListener('click', e => {
    window.headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', document.querySelector('.api-key').value);
    headers.append('Content-Type', 'application/octet-stream');
    fetch('https://westus.api.cognitive.microsoft.com/video/v1.0/trackface', { method: 'POST', headers, body: blob })
      .then(res => {
        console.log(res);
        window.ope = res.headers.get('Operation-Location');

        const intervalId = setInterval(() => {
          return fetch(ope, { headers })
            .then(res => res.json())
            .then(body => {
              if (body.status === 'Succeeded') {
                clearInterval(intervalId);
                console.log(JSON.parse(body.processingResult));
              }
            })
            .catch(err => {
              clearInterval(intervalId);
              alert(err)
            });
        }, 10000);
      })
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.api-key').value = localStorage.getItem('api-key')
  document.querySelector('.save-key').addEventListener('click', e => {
    localStorage.setItem('api-key', document.querySelector('.api-key').value);
  });
})
