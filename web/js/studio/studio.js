var Studio = function(targetUrl) {
		this.nodeSpeaker = document.getElementById("speaker");
		this.nodeLang = document.getElementById("lang");
		this.targetUrl = targetUrl;
		this.ajax = new Ajax();
		this.audioAuthWidget = new AudioAuthWidget();
		this.node = document.createElement("div");
		this.speakersNode = document.createElement("select");
		this.langsNode = document.createElement("select");
		this.speakers = [];
		this.init();
};

Studio.prototype.createRow = function(titleNode, dataNode) {
	var tr = document.createElement("tr");

	var th = document.createElement("th");
	tr.appendChild(th);
	th.appendChild(titleNode);

	var td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(dataNode);

	return tr;
};

Studio.prototype.addSpeaker = function(speaker) {
	this.speakers.push(speaker);
};

Studio.prototype.createOption = function(titleNode, value) {
	var option = document.createElement("option");
	if (value) option.value = value;
	option.appendChild(titleNode);
	return option;
};

Studio.prototype.updateSpeakers = function() {
	while (this.speakersNode.firstChild) this.speakersNode.removeChild(this.speakersNode.firstChild);

	this.speakersNode.appendChild(this.createOption(document.createTextNode("- Veuillez choisir un locuteur -")), null);
	for(var i = 0; i < this.speakers.length; i++) {
		var speaker = this.speakers[i];
		this.speakersNode.appendChild(this.createOption(document.createTextNode(speaker.name), speaker.id));

	}
};

Studio.prototype.createForm = function() {
	var table = document.createElement("table");
	table.className = "nice";
	table.appendChild(this.createRow(document.createTextNode("Locuteur"), this.speakersNode));
	table.appendChild(this.createRow(document.createTextNode("Langue"), this.langsNode));
	return table;
};

Studio.prototype.init = function() {
	this.node.className = "studio";
	
	this.node.appendChild(this.createForm());
	this.node.appendChild(this.audioAuthWidget.node);

	var self = this;
	this.audioAuthWidget.onenabled = function(stream) {
		var recorderWidget = new RecorderWidget(stream, function(sound, meta, doneCb) { self.send(sound, meta, doneCb) } );
		this.appendChild(recorderWidget.node);
	};
};

Studio.prototype.update = function() {
	this.updateSpeakers();
};

Studio.prototype.send = function send(sound, meta, doneCb) {
	var formData = new FormData();
	formData.append("user", 5);
	formData.append("sound", sound.getBlob());
	formData.append("text", meta.transcript);
	formData.append("description", meta.description);
	formData.append("speaker", document.getElementById("speaker").value);
	formData.append("lang", document.getElementById("lang").value);
	this.ajax.querySendData(this.targetUrl, "post", formData, function(result) {
		console.log(JSON.stringify(result));
		doneCb(result);
	}, false);
};

