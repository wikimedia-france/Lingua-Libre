var Widget = function(node) {
	this.node = node;
	this.callbacks = {};
};

Widget.prototype.createElement = function(tagName) {
	this.node = document.createElement(tagName);
	return this;
};

Widget.prototype.createTextNode = function(str) {
	this.node = document.createTextNode(str);
	return this;
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

Widget.prototype.addEventListener = function(event, target, fct, useCapture) {
	this.node.addEventListener(event, function(a, b, c, d, e) {
		return fct.call(target, a, b, c, d, e);
	}, useCapture);
	return this;
};

Widget.prototype.call = function(fctName, a, b, c, d, e) {
	return (fctName in this.callbacks) ? this.callbacks[fctName](a, b, c, d, e) : false;
};

Widget.prototype.setCallback = function(fctName, target, fct) {
	this.callbacks[fctName] = function(a, b, c, d, e) {
		return fct.call(target, a, b, c, d, e);
	};
	return this;
}

Widget.prototype.appendChild = function(child) {
	if (child) this.node.appendChild(child.node);
	return this;
};

Widget.prototype.appendChilds = function(childs) {
	for (var i = 0; i < childs.length; i++) {
		this.appendChild(childs[i]);
	}
	return this;
};

Widget.prototype.appendTextNode = function(text) {
	return this.appendChild(new Widget(document.createTextNode(text)));
};

Widget.prototype.unshiftChild = function(child) {
	this.node.insertBefore(child.node, this.node.childNodes[0]);
	return this;
};

Widget.prototype.setClass = function(className) {
	this.node.className = className;
	return this;
};

Widget.prototype.setAttribute = function(attribute, value) {
	this.node.setAttribute(attribute, value);
	return this;
};

Widget.prototype.getAttribute = function(attribute) {
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

