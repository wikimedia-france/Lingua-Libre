var ListingWidget = function() {
	this.node = document.createElement("div");
	this.items = [];
	this.current = null;
	this.recording = false;
	this.init();
};

ListingWidget.prototype.init = function() {
	var self = this;
	this.node.className = this.getClassName();
	this.node.setAttribute("tabindex", "0");
	this.node.onkeydown = function(e) { return self.onkeydown(e); };
};

ListingWidget.prototype.getClassName = function() {
	return "listing" + (this.recording ? " recording" : "");
};

ListingWidget.prototype.setRecording = function(value) {
	this.recording = value;
	this.node.className = this.getClassName();
};

ListingWidget.prototype.onkeydown = function(e) {
	switch(e.keyCode) {
		case 37: // Left
			this.incCurrentIndex(-1);
			return false;
		case 38: // Up
			this.decCurrentRow();
			this.gotoRowBegnining();
			return false;
		case 39: // Right
			this.incCurrentIndex(+1);
			return false;
		case 40: // Bottom
			this.incCurrentRow();
			return false;
	};
//	console.log(e.keyCode);
	return true;
};

ListingWidget.prototype.setList = function(list) {
	this.clear();
	for (var i = 0; i < list.length; i++) {
		this.push(new ListingWidgetItem(list[i]));
	}
	this.setCurrentIndex(0);
};

ListingWidget.prototype.findItemIndex = function(item) {
	if (!item) return -1;
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i] == item)
			return i;
	}
	return -1;
};

ListingWidget.prototype.incCurrentIndex = function(delta) {
	var index = this.findItemIndex(this.current);
	if (index < 0) return;

	this.setCurrentIndex(index + delta);
};

ListingWidget.prototype.incCurrentRow = function() {
	var index = this.findItemIndex(this.current);
	if (index < 0) return;

	var y = this.items[index].getY();
	for (var i = index + 1; i < this.items.length; i++) {
		if (this.items[i].getY() > y) {
			this.setCurrentIndex(i);
			return;
		}
	}
};

ListingWidget.prototype.getCurrent = function() {
	return this.current;
};

ListingWidget.prototype.getFirst = function() {
	return this.items.length > 0 ? this.items[0] : null;
};

ListingWidget.prototype.getLast = function() {
	return this.items.length > 0 ? this.items[this.items.length - 1] : null;
};

ListingWidget.prototype.gotoRowBegnining = function() {
	var index = this.findItemIndex(this.current);
	if (index < 0) return;

	var y = this.items[index].getY();
	for (var i = index - 1; i >= 0; i--) {
		if (this.items[i].getY() < y) {
			this.setCurrentIndex(i + 1);
			return;
		}
	}
	this.setCurrentIndex(0);
};

ListingWidget.prototype.decCurrentRow = function() {
	var index = this.findItemIndex(this.current);
	if (index < 1) return;

	var y = this.items[index].getY();
	for (var i = index - 1; i >= 0; i--) {
		if (this.items[i].getY() < y) {
			this.setCurrentIndex(i);
			return;
		}
	}
};

ListingWidget.prototype.setCurrentIndex = function(index) {
	index = Math.min(index, this.items.length - 1);
	index = Math.max(index, 0);
	this.setCurrent(this.items[index]);
};

ListingWidget.prototype.push = function(item) {
	this.items.push(item);
	this.node.appendChild(item.node);
	item.setParent(this);
};

ListingWidget.prototype.clear = function() {
	while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
	this.items = [];
	this.current = null;
};

ListingWidget.prototype.setCurrent = function(item) {
	if (this.current == item) return;

	if (this.current) this.current.setCurrent(false);
	this.current = item;
	this.current.setCurrent(true);
};

var ListingWidgetItem = function(str) {
	this.node = document.createElement("div");
	this.str = str;
	this.parent = null;
	this.current = false;
	this.success = null;
	this.sending = false;
	this.sound = false;
	this.init();
};

ListingWidgetItem.prototype.setParent = function(listing) {
	this.parent = listing;
};

ListingWidgetItem.prototype.setSound = function(sound) {
	this.sound = sound;
};

ListingWidgetItem.prototype.setSuccess = function(value) {
	this.sending = false;
	this.success = value;
	this.node.className = this.getClassName();
};

ListingWidgetItem.prototype.setSending = function(value) {
	this.sending = value;
	this.node.className = this.getClassName();
};

ListingWidgetItem.prototype.showSound = function() {
	//console.log(this.sound ? "sound id #" + this.sound.id : "no sound");
	if (this.sound && "showSound" in this.parent) this.parent.showSound(this.sound);
};

ListingWidgetItem.prototype.init = function() {
	var self = this;
	this.node.appendChild(document.createTextNode(this.str));
	this.node.onfocus = function(e) { self.onfocus(e); }
	this.node.setAttribute("tabindex", "0");
	this.node.className = this.getClassName();
	this.node.ondblclick = function() { self.showSound() };
};

ListingWidgetItem.prototype.pageDown = function() {
	if (this.node.offsetTop + this.node.offsetHeight > this.parent.node.scrollTop + this.parent.node.offsetHeight) {
		this.parent.node.scrollTop = this.node.offsetTop;
	}
};

ListingWidgetItem.prototype.setCurrent = function(state) {
	this.current = state;
	this.node.className = this.getClassName();
	
	if (state && document.activeElement != this.node) {
		if (this.parent.recording) this.pageDown();
		this.node.focus();
	}
};

ListingWidgetItem.prototype.getClassName = function() {
	return "item" + (this.current ? " current" : "") + (this.success === true ? " sent" : "") + (this.success === false ? " error" : "") + (this.sending ? " sending" : "");
};

ListingWidgetItem.prototype.getY = function() {
	return this.node.getBoundingClientRect().y;
};

ListingWidgetItem.prototype.onfocus = function(e) {
	this.parent.setCurrent(this);
};
