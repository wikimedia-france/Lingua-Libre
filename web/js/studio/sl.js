var Sl = function(lang, country, town) {
	this.lang = lang;
	this.country = country; 	
	this.town = town; 	
};

Sl.prototype.set = function(arr) {
	this.country = arr.country;
	this.town = arr.town;

	this.lang = new Lang();
	this.lang.set(arr.lang);
};
