var EntitySound = function(id, user, idiolect, filename, description, text) {
	this.id = id;
	this.user = user;
	this.idiolect = idiolect;
	this.filename = filename;
	this.description = description;
	this.text = text;
};

EntitySound.prototype.set = function(item) {
	this.id = item.id;
	this.text = item.text;
	this.description = item.description;
	this.filename = item.filename;
	this.idiolect = new Idiolect().set(item.idiolect);
	return this;
};
