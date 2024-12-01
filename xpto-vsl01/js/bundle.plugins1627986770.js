window.SQPlayer;
var SQVideo = {
 blockSelector: document.querySelector('#bt-play'),
 callToActionSelector: document.querySelector('#hid'),
 post_slug: undefined,
 timeToShowButton: 40,
 init() {
 SQVideo.commons();
 },
 add(opts) {
 this.post_slug = opts.post_slug;
 this.timeToShowButton = opts.timeToShowButton;
 if (opts.source == 'youtube')
 this.youtube.create(opts);
 },
 commons() {
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 function Resize() {
 if (document.querySelector('#bt-play')) {
 var hPlayer = document.querySelector('.video').clientHeight;
 var wPlayer = document.querySelector('.video').clientWidth;
 document.querySelector('#bt-play').style.width = wPlayer;
 document.querySelector('#bt-play').style.height = hPlayer;
 }
 }
 document.querySelector('#bt-play').style.display = 'none';
 Resize();
 window.addEventListener('onresize', Resize)
 },
 youtube: {
 playing: false,
 intervalDuration: false,
 data: {
 '25': false,
 '50': false,
 '75': false,
 '100': false
 },
 create(opts){
 SQPlayer = new YT.Player('player', {
 height: '480',
 width: '853',
 videoId: opts.video_id,
 playerVars: {
 'autoplay': opts.autoplay,
 'controls': opts.controls,
 'showinfo': 0,
 'autohide': 1,
 'fs': 0,
 'rel': 0,
 'modestbranding': 0,
 'playsinline': 1
 },
 events: {
 'onReady': this.onPlayerReady,
 'onStateChange': this.onPlayerStateChange
 }
 });
 },
 onPlayerReady(e) {
 SQVideo.blockScreen.click();
 SQVideo.callToAction.handler();
 },
 onPlayerStateChange(e) {
 if (SQPlayer && SQPlayer.getPlayerState() === 1) {
 SQVideo.pushLayer('Play')
 SQVideo.youtube.playing = true;
 }
 if (e.data == 1) {
 document.querySelector('#bt-play').style.display = 'block';
 document.querySelector('#bt-play').style.zIndex = '100';
 SQVideo.youtube.intervalDuration = setInterval(SQVideo.youtube.onDurationVideo, 62);
 if (SQVideo.isMobile.iOS())
 setTimeout(SQVideo.callToAction.show, 30)
 }
 if (readCookie(SQVideo.post_slug)) {
 SQVideo.callToAction.show();
 }
 },
 onDurationVideo() {
 var x = SQPlayer.getCurrentTime(),
 videoDuration = SQPlayer.getDuration();
 var percentVideo = (x * 100) / videoDuration;
 if (percentVideo > 25 && percentVideo < 50 && !SQVideo.youtube.data['25']) {
 SQVideo.youtube.data['25'] = true;
 if (email !== null) atualizaDados(25);
 SQVideo.pushLayer('25%')
 }
 if (percentVideo > 50 && percentVideo < 75 && !SQVideo.youtube.data['50']) {
 SQVideo.youtube.data['50'] = true;
 if (email !== null) atualizaDados(50);
 SQVideo.pushLayer('50%')
 }
 if (percentVideo > 75 && percentVideo < 99 && !SQVideo.youtube.data['75']) {
 SQVideo.youtube.data['75'] = true;
 if (email !== null) atualizaDados(75);
 SQVideo.pushLayer('75%')
 }
 if (percentVideo > 99 && !SQVideo.youtube.data['100']) {
 SQVideo.youtube.data['100'] = true;
 SQVideo.pushLayer('100%')
 }
 if (SQVideo.youtube.data['100'])
 clearInterval(SQVideo.youtube.intervalDuration);
 }
 },
 cookie: {
 done: false,
 create() {
 SQVideo.cookie.done = true;
 createCookie(SQVideo.post_slug, 10, 10);
 }
 },
 callToAction: {
 done: false,
 interval: undefined,
 handler() {
 SQVideo.callToAction.interval = setInterval(SQVideo.callToAction.time, 30);
 },
 time() {
 console.log(SQPlayer.getCurrentTime());
 if (!SQVideo.cookie.done && SQPlayer.getCurrentTime() > 10)
 SQVideo.cookie.create();
 if (!SQVideo.callToAction.done && SQPlayer.getCurrentTime() > SQVideo.timeToShowButton)
 SQVideo.callToAction.show();
 if (SQVideo.cookie.done && SQVideo.callToAction.done)
 clearInterval(SQVideo.callToAction.interval);
 },
 show() {
 SQVideo.callToAction.done = true;
 SQVideo.callToActionSelector.style.visibility = 'visible';
 },
 },
 //
 blockScreen: {
 click() {
 SQVideo.blockSelector.addEventListener('click', () => {
 console.log('listener');
 if (SQPlayer && !SQVideo.youtube.playing) {
 console.log('play');
 SQPlayer.playVideo();
 SQVideo.youtube.playing = true;
 }
 else if (SQPlayer && SQVideo.youtube.playing) {
 console.log('paused');
 SQPlayer.pauseVideo();
 SQVideo.youtube.playing = false;
 }
 })
 }
 },
 isMobile: {
 Android() {
 return navigator.userAgent.match(/Android/i);
 },
 BlackBerry() {
 return navigator.userAgent.match(/BlackBerry/i);
 },
 iOS() {
 return navigator.userAgent.match(/iPhone|iPad|iPod/i);
 },
 Opera() {
 return navigator.userAgent.match(/Opera Mini/i);
 },
 Windows() {
 return navigator.userAgent.match(/IEMobile/i);
 },
 any() {
 return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
 }
 },
 pushLayer(label) {
 dataLayer.push({
 'event': 'UA_Generic_Event',
 'eventCategory': 'SL',
 'eventAction': 'VSL',
 'eventLabel': label,
 'eventValue': undefined
 });
 }
}
function onYouTubeIframeAPIReady() {
 var controls = 0;
 if (readCookie("lau05v-carros")) {
 controls = 1;
 }
 SQVideo.add({
 video_id: 'FYl9tpqEg-s',
 source: 'youtube',
 autoplay: `1`,
 controls: controls,
 timeToShowButton: `30` /*seconds*/,
 post_slug: 'lau05v-carros'
 })
}
window.addEventListener('load', SQVideo.init);