var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
p.then(function(stream) {
   var video = document.querySelector('video');
   video.src = window.URL.createObjectURL(stream);
   video.onloadedmetadata = function(e) {
      // Do something with the video here.
      console.log(e);
      video.play()
   };
   
});
p.catch(function(e) { console.log(e.name); }); // always check for errors at the end.

console.log('a ')