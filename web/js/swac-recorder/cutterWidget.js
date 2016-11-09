var CutterWidget = function(stream, sendCb) {
	this.sendCb = sendCb;
	this.node = document.createElement("div");
	this.nodeButton = document.createElement("button");
	this.view = new CutterViewWidget();
	this.cutter = new Cutter(stream);
	this.init();
};

CutterWidget.prototype.initAudio = function(callback) {
	this.cutter.initAudio(callback);
};

CutterWidget.prototype.init = function() {
	var self = this;
	this.node.className = "cutter";

	this.node.appendChild(this.nodeButton);

	this.nodeButton.appendChild(document.createTextNode(""));
	this.nodeButton.onclick = function() {
		self.startStop();
	};
	
	this.node.appendChild(this.view.node);
	this.setState(false);

	this.cutter.onchanged = function() { self.changed(); };
	this.cutter.onstatechanged = function(state) { self.setState(state); };
};

CutterWidget.prototype.changed = function() {
	this.view.drawBuffers(this.cutter.getBuffers());
	this.view.setSaturated(this.cutter.getSaturated());
};

CutterWidget.prototype.start = function() {
	this.cutter.recorder.start();
};

CutterWidget.prototype.stop = function() {
	this.cutter.recorder.stop();
};

CutterWidget.prototype.startStop = function() {
	this.cutter.recorder.startStop();
};

CutterWidget.prototype.setState = function(value) {
	this.state = value;
	this.view.setRecording(value);
	this.nodeButton.firstChild.nodeValue = value ? "⏹" : "⏺";
	this.nodeButton.className = value ? "stop" : "record";
	if ("onstatechange" in this) this.onstatechange(value);
};

