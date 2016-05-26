var Recorder = function() {
	this.bufferLen = 1024;
	this.stream = null;
	this.buffers = [];
	this.state = false;
}

Recorder.prototype.onaudioprocess = function(e) {
	if (!this.state) return;

	var samples = e.inputBuffer.getChannelData(0);

	this.buffers.push(samples);
	if ("onchanged" in this) this.onchanged();
//	console.log(samples[0]);
};

Recorder.prototype.initStream = function(stream) {
	this.audioInput = this.audioContext.createMediaStreamSource(stream);

	this.node = this.audioContext.createScriptProcessor(this.bufferLen, 1, 0);

	var recorder = this;
	this.node.onaudioprocess = function(e) {
		recorder.onaudioprocess(e);
	};
}

Recorder.prototype.getSamplerate = function() {
	return 44100;
}

Recorder.prototype.getLength = function() {
	var result = 0;
	for (var i = 0; i < this.buffers.length; i++) {
		result += this.buffers[i].length;
	}
	return result;
}

Recorder.prototype.getSamples = function() {
	var result = new Float32Array(this.getLength());
	var offset = 0;
	for (var i = 0; i < this.buffers.length; i++) {
		var buffer = this.buffers[i];
		result.set(buffer, offset);
		offset += buffer.length;
	}
	return result;
}

Recorder.prototype.getSound = function() {
	return new Sound(this.audioContext.sampleRate, this.getSamples());
}

Recorder.prototype.start = function() {
	this.buffers = [];
	this.state = true;
	this.audioInput.connect(this.node);
}

Recorder.prototype.stop = function() {
	this.audioInput.disconnect(this.node);
	this.state = false; 
//	console.log(this.getLength());
}

Recorder.prototype.init = function(callback) {

	this.audioContext = new window.AudioContext();

	if (!navigator.getUserMedia) return null;
	var recorder = this;
	navigator.getUserMedia(
		{"audio": true, "video": false},

		function(localMediaStream) {
			recorder.initStream(localMediaStream);
			callback(true);
		},

		function(err) {
			console.log("The following error occured: " + err);
			callback(false);
		}
	);
	return true;
}

