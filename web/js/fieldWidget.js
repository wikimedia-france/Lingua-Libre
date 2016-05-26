var FieldWidget = function(key) {
	this.keys = {
		"text": {"title": "Texte", "type": "string"},
		"phonetic": {"title": "Transcription phonétique", "type": "string"},
		"comment": {"title": "commentaire", "type": "string"},
	};
	this.key = key;
	this.nodeKey = document.createElement("select");
	this.nodeValue = document.createElement("input");
	this.node = document.createElement("tr");
	this.nodeValueTd = document.createElement("td");
	this.nodeKeyTd = document.createElement("td");
	this.init();
}

FieldWidget.prototype.init = function() {
	this.node.className = "fieldWidget";

	//Key
	this.node.appendChild(this.nodeKeyTd);
	this.nodeKeyTd.appendChild(this.nodeKey);
	for (key in this.keys) {
		var option = document.createElement("option");
		var def = this.keys[key];
		option.appendChild(document.createTextNode(def.title));
		option.value = key;
		
		this.nodeKey.appendChild(option);
	}
	this.nodeKey.value = this.key;

	//Value
	this.node.appendChild(this.nodeValueTd);
	this.nodeValueTd.appendChild(this.nodeValue);
}


