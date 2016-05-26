
function initApi() {
	navigator.getUserMedia = 
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia;

	window.AudioContext = window.AudioContext || window.webkitAudioContext;
}

