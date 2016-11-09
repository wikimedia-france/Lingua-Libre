var MultiRecorder = function(stream, sendCb) {
	this.recorderWidget = new RecorderWidget(stream, sendCb );
	this.listingRecorderWidget = new ListingRecorderWidget(stream, sendCb );
	this.listingEditor = new ListingEditorWidget();
	
	this.node = document.createElement("div");
	this.recorderNode = document.createElement("div");
	this.init();
};

MultiRecorder.prototype.setContent = function(node) {
	while (this.recorderNode.firstChild) this.recorderNode.removeChild(this.recorderNode.firstChild);
	this.recorderNode.appendChild(node);
};

MultiRecorder.prototype.init = function() {
	var self = this;

	var a = document.createElement("a");
	a.appendChild(document.createTextNode("Enregistrement manuel"));
	a.onclick = function() { self.setContent(self.recorderWidget.node) };
	this.node.appendChild(a);

	this.node.appendChild(document.createTextNode(" | "));

	var a = document.createElement("a");
	a.appendChild(document.createTextNode("Enregistrement par listing"));
	a.onclick = function() { self.setContent(self.listingEditor.node) };
	this.node.appendChild(a);

	this.node.appendChild(this.recorderNode);
	
	//--Manual mode
	this.setContent(this.recorderWidget.node);

	//--listing
	this.listingEditor.setList([
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table",
		"un avion", 
		"une maison",
		"du chou",
		"un ordinateur",
		"une table"
	]);
	this.listingEditor.onsubmit = function(list) {
		self.listingRecorderWidget.setList(list);
		self.setContent(self.listingRecorderWidget.node);
	};	
};
