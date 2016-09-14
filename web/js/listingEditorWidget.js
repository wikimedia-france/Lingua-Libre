var ListingEditorWidget = function() {
	this.node = document.createElement("form");
	this.nodeTextarea = document.createElement("textarea");
	this.nodeButton = document.createElement("button");
	this.init();
};

ListingEditorWidget.prototype.getList = function() {
	var result = [];
	var lines = this.nodeTextarea.value.split("\n");
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if (line != "") result.push(line);
	}
	return result;
};

ListingEditorWidget.prototype.submit = function() {
	var list = this.getList();
	if ("onsubmit" in this) this.onsubmit(list);
};

ListingEditorWidget.prototype.setList = function(list) {
	this.nodeTextarea.value = list.join("\n");
};

ListingEditorWidget.prototype.init = function() {
	var self = this;
	this.node.className = "listingEditor";
	this.node.onsubmit = function() { self.submit(); return false; };

	this.node.appendChild(this.nodeTextarea);

	var div = document.createElement("div");
	this.node.appendChild(div);

	this.nodeButton.appendChild(document.createTextNode("Ok"));
	div.appendChild(this.nodeButton);
};
