var Buffer = function(samples) {
	this.samples = samples;
	this.max = null;
	this.min = null;
	this.absmax = null;
};

Buffer.prototype.getLength = function() {
	return this.samples.length;
};

Buffer.prototype.getMax = function() {
	if (this.max != null) return this.max;

	this.max = 0;
	for (var i = 0; i < this.samples.length; i++) {
		var sample = this.samples[i];
		if (sample > this.max) this.max = sample;
	}
	return this.max;
};

Buffer.prototype.getMin = function() {
	if (this.min != null) return this.min;

	this.min = 0;
	for (var i = 0; i < this.samples.length; i++) {
		var sample = this.samples[i];
		if (sample < this.min) this.min = sample;
	}
	return this.min;
};

Buffer.prototype.getAbsmax = function() {
	if (this.absmax != null) return this.absmax;

	this.absmax = 0;
	for (var i = 0; i < this.samples.length; i++) {
		var sample = Math.abs(this.samples[i]);
		if (sample > this.absmax) this.absmax = sample;
	}
	return this.absmax;
};
