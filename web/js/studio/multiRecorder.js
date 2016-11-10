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

MultiRecorder.prototype.createMenu = function() {
	var self = this;
	var ul = document.createElement("ul");
	ul.className = "tabs";

	var li = document.createElement("li");
	li.appendChild(document.createTextNode("Enregistrement manuel"));
	li.onclick = function() { self.setContent(self.recorderWidget.node) };
	ul.appendChild(li);

	var li = document.createElement("li");
	li.appendChild(document.createTextNode("Enregistrement par listing"));
	li.onclick = function() { self.setContent(self.listingEditor.node) };
	ul.appendChild(li);

	return ul;
};

MultiRecorder.prototype.init = function() {
	var self = this;

	this.node.className = "multiRecorder";
	this.node.appendChild(this.createMenu());
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
