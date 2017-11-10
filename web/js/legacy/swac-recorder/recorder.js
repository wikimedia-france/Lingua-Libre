var Recorder = function(stream) {
	this.buffers = new Buffers(44100);
	this.audioContext = new window.AudioContext();
	this.bufferLen = 2048;
	this.stream = null;
	this.state = false;
	this.initStream(stream);
};

Recorder.prototype.onaudioprocess = function(e) {
	if (!this.state) return;

	//Copy the samples in a new Float32Array, to avoid strange memory dealocation on chrome
	var samples = new Float32Array(e.inputBuffer.getChannelData(0));
	var buffer = new Buffer(samples);
	this.buffers.push(buffer);
	this.changed(buffer);
};

Recorder.prototype.changed = function(buffer) {
	if ("onchanged" in this) this.onchanged(buffer);
};

Recorder.prototype.initStream = function(stream) {
	this.audioInput = this.audioContext.createMediaStreamSource(stream);
	this.buffers.setSamplerate(this.audioContext.sampleRate);

	this.node = this.audioContext.createScriptProcessor(this.bufferLen, 1, 1);

	var recorder = this;
	this.node.onaudioprocess = function(e) {
		recorder.onaudioprocess(e);
	};
};

Recorder.prototype.clear = function() {
	this.buffers.clear();
	this.changed(null);
};

Recorder.prototype.setState = function(value) {
	this.state = value;
	if ("onstatechanged" in this) this.onstatechanged(value);
};

Recorder.prototype.start = function() {
	this.clear();
	this.setState(true);
	this.audioInput.connect(this.node);
	this.node.connect(this.audioContext.destination);
};

Recorder.prototype.stop = function() {
	this.audioInput.disconnect(this.node);
	this.node.disconnect(this.audioContext.destination);
	this.setState(false);
};

Recorder.prototype.startStop = function() {
	if (this.state)
		this.stop();
	else
		this.start();
};


