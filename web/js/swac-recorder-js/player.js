var Player = function(buffers) {
	this.buffers = buffers;
	this.audioContext = new window.AudioContext();
};

Player.prototype.createArrayBuffer = function() {
	var samples = this.buffers.getSamples();

	var result = this.audioContext.createBuffer(1, samples.length, this.buffers.getSamplerate());
	var channelData = result.getChannelData(0);
	for (var i = 0; i < samples.length; i++) {
		channelData[i] = samples[i];
	}
	return result;
};

Player.prototype.play = function() {
	var source = this.audioContext.createBufferSource();
	source.buffer = this.createArrayBuffer();
	source.connect(this.audioContext.destination);
	source.start();
};
