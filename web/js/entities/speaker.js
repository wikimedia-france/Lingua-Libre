var Speaker = function(id, name, idiolects) {
	this.id = id;
	this.name = name;
	this.idiolects = idiolects ? idiolects : [];
};

Speaker.prototype.addIdiolect = function(idiolect) {
	this.idiolects.push(idiolect);
};

Speaker.prototype.setIdiolects = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		var idiolect = new Idiolect();
		idiolect.set(arr[i]);
		this.addIdiolect(idiolect);		
	}
};

Speaker.prototype.set = function(item) {
	this.id = item.id;
	this.name = item.name;
	this.setIdiolects(item.idiolects);
	return this;
};
