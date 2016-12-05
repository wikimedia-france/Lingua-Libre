var Speaker = function(id, name, sls) {
	this.id = id;
	this.name = name;
	this.sls = sls ? sls : [];
};

Speaker.prototype.addSl = function(sl) {
	this.sls.push(sl);
};

Speaker.prototype.setSls = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		var sl = new Sl();
		sl.set(arr[i]);
		this.addSl(sl);		
	}
};

Speaker.prototype.set = function(item) {
	this.id = item.id;
	this.name = item.name;
	this.setSls(item.sls);
	return this;
};
