var Recorder = function(stream) {
	this.buffers = new Buffers(44100);
	this.audioContext = new window.AudioContext();
	this.bufferLen = 4096;
	this.stream = null;
	this.state = false;
	this.initStream(stream);
};

Recorder.prototype.onaudioprocess = function(e) {
	if (!this.state) return;

	var samples = e.inputBuffer.getChannelData(0);
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
	this.node.connect(this.audioContext.destination);
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
};

Recorder.prototype.stop = function() {
	this.audioInput.disconnect(this.node);
	this.setState(false);
};

Recorder.prototype.startStop = function() {
	if (this.state)
		this.stop();
	else
		this.start();
};


