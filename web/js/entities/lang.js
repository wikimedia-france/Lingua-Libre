
var Lang = function(id, title) {
//	this.id = id;
//	this.title = title; 	
};


Lang.prototype.set = function(arr) {
    this.id = arr.id;
    this.title = arr.title;
    this.code = arr.code;
    return this;
};
