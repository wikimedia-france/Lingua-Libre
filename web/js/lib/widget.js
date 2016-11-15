var Widget = function(node) {
	this.node = node;
};

Widget.prototype.setVisibility = function(value) {
	this.node.style.display = value ? "" : "none";
	return this;
};

Widget.prototype.getVisibility = function() {
	return this.node.style.display != "none";
};

Widget.prototype.swVisibility = function() {
	return this.setVisibility(!this.getVisibility());
};

Widget.prototype.innerHTML = function(html) {
	this.node.innerHTML = html;
	return this;
};

Widget.prototype.getChildsByName = function(name) {
	var result = [];
	var childs = this.node.childNodes;
	for (var i = 0; i < childs.length; i++) {
		var child = childs[i];
		if (child.nodeType == 1 && child.nodeName == name) {
			result.push(child);
		}
	}
	return result;
};

Widget.prototype.clearChilds = function() {
	while (this.node.firstChild)
		this.node.removeChild(this.node.firstChild);
	return this;
};

Widget.prototype.connect = function(event, target, method) {
	var self = this;
	this.node[event] = function(a, b, c, d) {
		return target[method](self, a, b, c, d);
	};
	return this;
};

Widget.prototype.emit = function(event, a, b, c, d) {
	if (event in this.node) {
		this.node[event](a, b, c, d);
	}
};

Widget.prototype.addChild = function(child) {
	if (child) this.node.appendChild(child.node);
	return this;
};

Widget.prototype.addChilds = function(childs) {
	for (var i = 0; i < childs.length; i++) {
		this.addChild(childs[i]);
	}
	return this;
};

Widget.prototype.addTextChild = function(text) {
	return this.addChild(new Widget(document.createTextNode(text)));
};

Widget.prototype.unshiftChild = function(child) {
	this.node.insertBefore(child.node, this.node.childNodes[0]);
	return this;
};

Widget.prototype.setClass = function(className) {
	this.node.className = className;
	return this;
};

Widget.prototype.setAttr = function(attribute, value) {
	this.node.setAttribute(attribute, value);
	return this;
};

Widget.prototype.getAttr = function(attribute) {
	return this.node.getAttribute(attribute);
};

Widget.prototype.childs = function() {
	return this.node.childNodes;
};

Widget.prototype.value = function() {
	return this.node.value;
};

Widget.prototype.replaceWidget = function(widget) {
	this.node.parentNode.replaceChild(widget.node, this.node);
	return widget;
};

Widget.prototype.removeWidget = function() {
	this.node.parentNode.removeChild(this.node);
	return null;
};

Widget.createElement = function(tagName) {
	return new Widget(document.createElement(tagName));
};

Widget.createTextNode = function(str) {
	return new Widget(document.createTextNode(str));
};

