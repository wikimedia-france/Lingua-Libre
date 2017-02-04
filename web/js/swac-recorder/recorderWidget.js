var RecorderWidget = function(stream, sendCb) {
	this.sendCb = sendCb;
	this.node = document.createElement("div");
	this.nodeButton = document.createElement("button");
	this.nodeBuffers = document.createElement("div");
	this.recorder = new Recorder(stream);
	this.init();
}

RecorderWidget.prototype.init = function() {
	var self = this;
	this.node.className = "recorder";

	this.node.appendChild(this.nodeBuffers);
	this.node.appendChild(this.nodeButton);

	this.nodeButton.className = "record";
	this.nodeButton.appendChild(document.createTextNode(""));
	this.nodeButton.onclick = function() {
		self.onclick();
	};

	this.setState(false);
	this.recorder.onchanged = function() {
		self.nodeButton.firstChild.nodeValue = "Enregistrement… " + Math.floor(this.buffers.getDuration() * 1000) + " ms";
	};
}

RecorderWidget.prototype.onclick = function() {
	this.setState(!this.state);
	if (this.state) {
		this.recorder.start();
	}
	else {
		this.recorder.stop();
		var widget = new SoundWidget(this.recorder.buffers, this.sendCb);
		this.nodeBuffers.appendChild(widget.node);
		this.nodeButton.scrollIntoView(false);
	}
}

RecorderWidget.prototype.setState = function(value) {
	this.state = value;
	this.nodeButton.firstChild.nodeValue = value ? "Stop" : "Démarrer";
}

