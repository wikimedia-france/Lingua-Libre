var Sound = function(sampleRate, samples) {
	this.sampleRate = sampleRate;
	this.samples = samples;
};

Sound.prototype.set = function(samples) {
	this.samples = samples;
};

DataView.prototype.writeString = function(offset, str) {
	for (var i = 0; i < str.length; i++){
		this.setUint8(offset + i, str.charCodeAt(i));
	}
};

Sound.prototype.getSampleRate = function() {
	return this.sampleRate;
};

Sound.prototype.getBlob = function() {
	return new Blob([this.encodeWAVE()], {"type": "audio/wav"});
};

Sound.prototype.encodeWAVE = function() {
	var buffer = new ArrayBuffer(44 + this.samples.length * 2);
	var view = new DataView(buffer);

	/* RIFF identifier */
	view.writeString(0, 'RIFF');
	/* file length */
	view.setUint32(4, 32 + this.samples.length * 2, true);
	/* RIFF type */
	view.writeString(8, 'WAVE');
	/* format chunk identifier */
	view.writeString(12, 'fmt ');
	/* format chunk length */
	view.setUint32(16, 16, true);
	/* sample format (raw) */
	view.setUint16(20, 1, true);
	/* channel count */
	view.setUint16(22, 1, true);
	/* sample rate */
	view.setUint32(24, this.sampleRate, true);
	/* byte rate (sample rate * block align) */
	view.setUint32(28, this.sampleRate * 2, true);
	/* block align (channel count * bytes per sample) */
	view.setUint16(32, 2, true);
	/* bits per sample */
	view.setUint16(34, 16, true);
	/* data chunk identifier */
	view.writeString(36, 'data');
	/* data chunk length */
	view.setUint32(40, this.samples.length * 2, true);

	for (var i = 0; i < this.samples.length; i++){
		view.setInt16(44 + i * 2, this.samples[i] * 0x7FFF, true);
	}

	return view;
}


