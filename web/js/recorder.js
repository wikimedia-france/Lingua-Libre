var Recorder = function() {
	this.audioContext = new window.AudioContext();
	this.bufferLen = 1024;
	this.stream = null;
	this.buffers = [];
	this.state = false;
}

Recorder.prototype.onaudioprocess = function(e) {
	if (!this.state) return;

	var samples = e.inputBuffer.getChannelData(0);

	this.buffers.push(samples);
	this.changed();
//	console.log(samples[0]);
};

Recorder.prototype.changed = function() {
	if ("onchanged" in this) this.onchanged();
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
	return this.audioContext.sampleRate;
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

Recorder.prototype.clear = function() {
	this.buffers = [];
	this.changed();
}

Recorder.prototype.start = function() {
	this.clear();
	this.state = true;
	this.audioInput.connect(this.node);
}

Recorder.prototype.stop = function() {
	this.audioInput.disconnect(this.node);
	this.state = false; 
//	console.log(this.getLength());
}

Recorder.prototype.init = function(callback) {
	navigator.getUserMediaFct = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	if (!navigator.getUserMediaFct) return null;

	var recorder = this;
	navigator.getUserMediaFct(
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

