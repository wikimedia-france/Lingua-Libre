var Buffers = function(samplerate) {
	this.samplerate = samplerate;
	this.list = [];
};

Buffers.prototype.push = function(buffer) {
	this.list.push(buffer);
};

Buffers.prototype.setSamplerate = function(value) {
	this.samplerate = value;
};

Buffers.prototype.getSamplerate = function() {
	return this.samplerate;
};

Buffers.prototype.getLength = function() {
	return this.list.length;
};

Buffers.prototype.getBuffer = function(i) {
	return this.list[i];
};

Buffers.prototype.getSamplesLength = function() {
	var result = 0;
	for (var i = 0; i < this.list.length; i++) {
		result += this.list[i].getLength();
	}
	return result;
};

Buffers.prototype.duration = function(length) {
	return length / this.getSamplerate();
};

Buffers.prototype.getDuration = function() {
	return this.duration(this.getSamplesLength());
};

Buffers.prototype.getSamples = function() {
	var result = new Float32Array(this.getSamplesLength());
	var offset = 0;
	for (var i = 0; i < this.list.length; i++) {
		var buffer = this.list[i];
		result.set(buffer.samples, offset);
		offset += buffer.getLength();
	}
	return result;
};

Buffers.prototype.getLastBuffer = function() {
	return this.list.length == 0 ? null : this.list[this.list.length - 1];
};

Buffers.prototype.getFirstBuffer = function() {
	return this.list.length == 0 ? null : this.list[0];
};

Buffers.prototype.ltrim = function(value) {
	var size = 0;
	while (this.list.length > 0) {
		var buffer = this.getFirstBuffer();
		size += buffer.getLength();

		if (this.duration(size) > value)
			return;

		this.list.shift();
	}
};

Buffers.prototype.rtrim = function(value) {
	var size = 0;
	while (this.list.length > 0) {
		var buffer = this.getLastBuffer();
		size += buffer.getLength();

		if (this.duration(size) > value)
			return;

		this.list.pop();
	}
};

Buffers.prototype.pos = function(buffer) {
	if (!buffer)
		return false;

	var pos = 0;
	for (var i = 0; i < this.list.length; i++) {
		if (this.list[i] == buffer)
			return pos; 
		pos += buffer.getLength();
	}
	return false;
};

Buffers.prototype.posT = function(buffer) {
	var pos = this.pos(buffer);
	return pos ? this.duration(pos) : 0;
};

Buffers.prototype.getSound = function() {
	return new Sound(this.getSamplerate(), this.getSamples());
};

Buffers.prototype.clear = function() {
	this.list = [];
};

