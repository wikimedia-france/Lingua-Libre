var Speaker = function(id, name, langs) {
	this.id = id;
	this.name = name;
	this.langs = langs ? langs : [];
};

Speaker.prototype.addLang = function(lang) {
	this.langs.push(lang);
};

Speaker.prototype.setLangs = function(arr) {
console.log("length" + arr.length);
	for (var i = 0; i < arr.length; i++) {
		var lang = new Lang();
		lang.set(arr[i]);
		this.addLang(lang);		
	}
};

Speaker.prototype.set = function(item) {
	this.id = item.id;
	this.name = item.name;
	this.setLangs(item.langs);
};
