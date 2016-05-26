var RecorderWidget = function(sendCb) {
	this.sendCb = sendCb;
	this.node = document.createElement("div");
	this.nodeButton = document.createElement("button");
	this.nodeBuffers = document.createElement("div");
	this.recorder = new Recorder();
	this.init();
}

RecorderWidget.prototype.initState = function(value) {
	this.nodeButton.disabled = !value;
}

RecorderWidget.prototype.init = function() {
	var obj = this;
	this.node.className = "recorderWidget";

	if (!this.recorder.init(function(value) {
		obj.initState(value)		;
	})) {
		var error = document.createElement("p");
		error.className = "error";
		error.appendChild(document.createTextNode("Could not access to audio resource!"));
		this.node.appendChild(error);
		return;
	}

	this.node.appendChild(this.nodeBuffers);

	this.node.appendChild(this.nodeButton);
	this.nodeButton.disabled = true;

	this.nodeButton.className = "record";
	this.nodeButton.appendChild(document.createTextNode(""));
	this.nodeButton.onclick = function() {
		obj.onclick();
	};

	this.setState(false);

	this.recorder.onchanged = function() {
		obj.nodeButton.firstChild.nodeValue = "Enregistrement… " + Math.floor(this.getLength() / this.getSamplerate() * 1000) + " ms";
	};
}

RecorderWidget.prototype.onclick = function() {
	this.setState(!this.state);
	if (this.state) {
		this.recorder.start();
	}
	else {
		this.recorder.stop();
		var widget = new SoundWidget(this.recorder.getSound(), this.sendCb);
		this.nodeBuffers.appendChild(widget.node);
		window.scroll(0, this.node.offsetHeight);
	}
}

RecorderWidget.prototype.setState = function(value) {
	this.state = value;
	this.nodeButton.firstChild.nodeValue = value ? "Stop" : "Démarrer";
}

