var PaginatorWidget = function() {
	Widget.call(this);

	this.next = new Widget().createElement("button");
	this.number = new Widget().createElement("span"); 
	this.previous = new Widget().createElement("button");
	this.page = 0;
	this.npages = 0;
	this.init();
};

PaginatorWidget.prototype = Object.create(Widget.prototype);
PaginatorWidget.prototype.constructor = PaginatorWidget;

PaginatorWidget.prototype.showPosition = function(page, npages) {
	this.number
		.clearChilds()
		.appendTextNode((page + 1) + " / " + npages);
};

PaginatorWidget.prototype.setPosition = function(page, npages) {
	this.page = page;
	this.npages = npages;
	this.showPosition(page, npages);
	this.call("changeposition", page);
};

PaginatorWidget.prototype.init = function() {
	this.createElement("div").setClass("paginator")
		.appendChild(this.previous
			.appendTextNode("⏪")
			.addEventListener("click", this, function() { this.pageInc(-1) } )
		)
		.appendChild(this.number.setClass("number"))
		.appendChild(this.next
			.appendTextNode("⏩")
			.addEventListener("click", this, function() { this.pageInc(+1) } )
		)
	;
};

PaginatorWidget.prototype.pageInc = function(n) {
	var page = this.page + n;
	page = Math.max(page, 0);
	page = Math.min(page, this.npages - 1);
	if (page != this.page) this.setPosition(page, this.npages);
};

