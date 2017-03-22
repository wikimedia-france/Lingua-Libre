var Idiolect = function(id, lang, country, town, speaker) {
	this.id = id;
	this.lang = lang;
	this.country = country; 	
	this.town = town; 	
	this.speaker = speaker;
};

Idiolect.prototype.getTitle = function() {
	return this.lang.title + (this.dialect ? " (" + this.dialect + ")" : "");
};

Idiolect.prototype.set = function(arr) {
	this.id = arr.id;
	this.country = arr.country;
	this.town = arr.town;
	this.dialect = "dialect" in arr ? arr.dialect : false;

	this.lang = new Lang().set(arr.lang);
	if ("speaker" in arr) this.speaker = new Speaker().set(arr.speaker);
	return this;
};
