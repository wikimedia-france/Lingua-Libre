var Player = function(sound) {
	this.sound = sound;
	this.audioContext = new window.AudioContext();
}

Player.prototype.createArrayBuffer = function() {
	var result = this.audioContext.createBuffer(1, this.sound.samples.length, this.sound.sampleRate);
	var samples = result.getChannelData(0);
	for (var i = 0; i < samples.length; i++) {
		samples[i] = this.sound.samples[i];
	}
	return result;
}

Player.prototype.play = function() {
	var source = this.audioContext.createBufferSource();
	source.buffer = this.createArrayBuffer();
	source.connect(this.audioContext.destination);
	source.start();
}
