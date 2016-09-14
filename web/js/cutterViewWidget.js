var CutterViewWidget = function() {
	this.node = document.createElement("div");
	this.nodeCanvas = document.createElement("canvas");
	this.context = this.nodeCanvas.getContext('2d');
	this.nodeRecording = document.createElement("div");

	this.height = 64;
	this.width = 800;
	this.step = 4400;
	this.init();
};

CutterViewWidget.prototype.init = function() {
	this.node.className = "cutterView";
	this.nodeCanvas.setAttribute("width", this.width);
	this.nodeCanvas.setAttribute("height", this.height);
	this.node.appendChild(this.nodeCanvas);

	this.nodeRecording.className = "spinner";
	this.node.appendChild(this.nodeRecording);

	this.context.translate(0, 64);
	this.context.scale(1, -1);
	this.context.fillStyle = "lightgray";
	this.setRecording(false);
};

CutterViewWidget.prototype.setRecording = function(value) {
	this.nodeRecording.style.display = value ? "" : "none";
};

CutterViewWidget.prototype.clear = function() {
	this.context.clearRect(0, 0, this.width, this.height);
};

CutterViewWidget.prototype.drawBuffers = function(buffers) {
	this.clear();
	for (var i = 0; i < buffers.getLength(); i++){
		var buffer = buffers.getBuffer(i);
		this.context.fillRect(i * 5, 0, 5, Math.ceil(buffer.getAbsmax() * this.height));
	}
};

CutterViewWidget.prototype.setSaturated = function(value) {
	this.nodeCanvas.className = value ? "saturated" : "";
};
