var Idiolect = function(id, lang, country, town) {
	this.id = id;
	this.lang = lang;
	this.lang = lang;
	this.country = country; 	
	this.town = town; 	
};

Idiolect.prototype.getTitle = function() {
	return this.lang.title + (this.dialect ? " (" + this.dialect + ")" : "");
};

Idiolect.prototype.set = function(arr) {
	this.id = arr.id;
	this.country = arr.country;
	this.town = arr.town;
	this.dialect = "dialect" in arr ? arr.dialect : false;

	this.lang = new Lang();
	this.lang.set(arr.lang);
	return this;
};
