var Studio = function(userId, targetUrl, addSpeakerUrl) {
		this.targetUrl = targetUrl;
		this.userId = userId;
		this.addSpeakerUrl = addSpeakerUrl;
		this.speakers = [];
		
		this.ajax = new Ajax();
		this.audioAuthWidget = new AudioAuthWidget();
		this.node = document.createElement("div");
		this.speakersNode = document.createElement("select");
		this.langsNode = document.createElement("select");
		
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

Studio.prototype.createOption = function(titleNode, data) {
	var option = document.createElement("option");
	option.appendChild(titleNode);
	option.data = data;
	return option;
};

Studio.prototype.showSpeakers = function(speakers) {
	while (this.speakersNode.firstChild) this.speakersNode.removeChild(this.speakersNode.firstChild);

	this.speakersNode.appendChild(this.createOption(document.createTextNode("- Veuillez choisir un locuteur -")), null);
	for(var i = 0; i < speakers.length; i++) {
		var speaker = speakers[i];
		this.speakersNode.appendChild(this.createOption(document.createTextNode(speaker.name), speaker));

	}
};

Studio.prototype.showLangs = function(langs) {
	while (this.langsNode.firstChild) this.langsNode.removeChild(this.langsNode.firstChild);

	this.langsNode.appendChild(this.createOption(document.createTextNode("- Veuillez choisir une langue -")), null);
	for(var i = 0; i < langs.length; i++) {
		var lang = langs[i];
		this.langsNode.appendChild(this.createOption(document.createTextNode(lang.title), lang));

	}
};

Studio.prototype.setSpeaker = function(speaker) {
	this.showLangs(speaker.langs);
};

Studio.prototype.onchangeSpeaker = function(e) {
	var option = this.speakersNode.options[this.speakersNode.selectedIndex];
	var speaker = option.data;
	this.setSpeaker(speaker);
};

Studio.prototype.createIcon = function(src, title, href) {
	var a = document.createElement("a");
	a.href = href;
	
	var img = document.createElement("img");
	img.src = src;
	img.title = title;
	a.appendChild(img);
	return a;
};

Studio.prototype.createForm = function() {
	var table = document.createElement("table");
	table.className = "nice";

	var tr = this.createRow(document.createTextNode("Locuteur"), this.speakersNode);
	var th = document.createElement("th");
	th.appendChild(this.createIcon("img/add_24.png", "Ajouter un locuteur", this.addSpeakerUrl));
	tr.appendChild(th);
	table.appendChild(tr);
	
	table.appendChild(this.createRow(document.createTextNode("Langue"), this.langsNode));

	var self = this;
	this.speakersNode.onchange = function(e) { return self.onchangeSpeaker(e) };
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
	this.showSpeakers(this.speakers);
};

Studio.prototype.send = function send(sound, meta, doneCb) {
	var formData = new FormData();
	formData.append("user", this.userId);
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

