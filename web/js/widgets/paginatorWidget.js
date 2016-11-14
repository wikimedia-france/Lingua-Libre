var PaginatorWidget = function() {
	this.node = document.createElement("div");
	this.nextNode = document.createElement("button");
	this.numberNode = document.createElement("span"); 
	this.previousNode = document.createElement("button");
	this.page = 0;
	this.npages = 0;
	this.init();
};

PaginatorWidget.prototype.showPosition = function(page, npages) {
	this.numberNode.firstChild.nodeValue = (page + 1) + " / " + npages;
};

PaginatorWidget.prototype.setPosition = function(page, npages) {
	this.page = page;
	this.npages = npages;
	this.showPosition(page, npages);
	if ("onchangeposition" in this) this.onchangeposition(page);
};

PaginatorWidget.prototype.init = function() {
	var self = this;
	this.node.className = "paginator";

	this.node.appendChild(this.previousNode);
	this.previousNode.appendChild(document.createTextNode("⏪"));
	this.previousNode.onclick = function() { self.pageInc(-1); };

	this.node.appendChild(this.numberNode);
	this.numberNode.appendChild(document.createTextNode(""));
	this.numberNode.className = "number";
	
	this.node.appendChild(this.nextNode);
	this.nextNode.appendChild(document.createTextNode("⏩"));
	this.nextNode.onclick = function() { self.pageInc(1); };
};

PaginatorWidget.prototype.pageInc = function(n) {
	var page = this.page + n;
	page = Math.max(page, 0);
	page = Math.min(page, this.npages - 1);
	if (page != this.page) this.setPosition(page, this.npages);
};

