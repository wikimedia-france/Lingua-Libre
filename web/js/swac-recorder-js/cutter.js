var Cutter = function(stream) {
	this.recorder = new Recorder(stream);
	this.saturationThreshold = 0.99;
	this.silenceThreshold = 0.05;
	this.startThreshold = 0.1;
	this.bufferLength = 0.8;
	this.marginBefore = 0.25;
	this.marginAfter = 0.25;
	this.stopSilence = 0.3;
	this.minimalLength = 0.20;
	this.normalize = true;

	this.initState();
	this.init();
};

Cutter.prototype.initState = function() {
	this.saturated = false;
	this.started = false;
	this.lastBufferWaiting = null;
	this.firstBufferEnding = null;
	this.silence = 0;
};

Cutter.prototype.initAudio = function(callback) {
	this.recorder.initAudio(callback);
};

Cutter.prototype.init = function(callback) {
	var self = this;
	this.clear();
	this.recorder.onchanged = function(buffer) { self.changed(buffer); };
	this.recorder.onstatechanged = function(state) { self.statechanged(state); };

};

Cutter.prototype.statechanged = function(state) {
	if (!state) this.clear();
	if ("onstatechanged" in this) this.onstatechanged(state);
};

Cutter.prototype.getSaturated = function() {
	return this.saturated;
};

Cutter.prototype.clear = function() {
	this.initState();	
	this.recorder.clear();
};

Cutter.prototype.addBufferWaiting = function(buffer) {
	var buffers = this.getBuffers();

	if (buffer.getAbsmax() < this.silenceThreshold)
		this.lastBufferWaiting = buffer;

	var duration = buffers.getDuration();
	if (buffer.getAbsmax() > this.startThreshold) {
		this.started = true;
		return;
	}

	if (duration > this.bufferLength) {
		buffers.ltrim(duration - this.bufferLength);
		if (!buffers.pos(this.lastBufferWaiting))
			this.lastBufferWaiting = null;
	}
};

Cutter.prototype.isValid = function() {
	return true;
};

Cutter.prototype.addBufferEnding = function(buffer) {
	var buffers = this.getBuffers();

	if (buffer.getAbsmax() < this.silenceThreshold) {
		if (!this.firstBufferEnding) this.firstBufferEnding = buffer;
		this.silence += buffers.duration(buffer.getLength());
	}
	else {
		this.firstBufferEnding = null;
		this.silence = 0;
	}

	if (this.silence > this.stopSilence) {
		if (this.isValid()) {
			buffers.ltrim(this.recordFrom() - this.marginBefore);
			buffers.rtrim(this.stopSilence - this.marginAfter);
//			if (this.normalize) this.doNormalize();
			this.save();
		}
		this.clear();
	}
};

Cutter.prototype.save = function() {
	if ("onsave" in this) {
		if (!this.onsave(this.getBuffers()))
			this.recorder.stop();
	}
};

Cutter.prototype.addBuffer = function(buffer) {
	if (buffer.getAbsmax() > this.saturationThreshold) {
		this.saturated = true;
	}

	if (!this.started) {
		this.addBufferWaiting(buffer);
	}
	else {
		this.addBufferEnding(buffer);
	}
};

Cutter.prototype.changed = function(buffer) {
	if (buffer) this.addBuffer(buffer);

//	if (this.getBuffers().getDuration() > 4) {
//		this.clear();
//	}

	if ("onchanged" in this) this.onchanged();
};

Cutter.prototype.getBuffers = function() {
	return this.recorder.buffers;
};

Cutter.prototype.recordFrom = function() {
	var buffers = this.getBuffers();
	return this.lastBufferWaiting == null ? 0 : buffers.posT(this.lastBufferWaiting) + buffers.duration(this.lastBufferWaiting.getLength());
};

Cutter.prototype.recordTo = function() {
	var buffers = this.getBuffers();
	return this.firstBufferEnding == null ? 0 : buffers.posT(this.firstBufferEnding);
};

