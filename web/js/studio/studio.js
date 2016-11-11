var Studio = function(userId, targetUrl, addSpeakerNode) {
		this.targetUrl = targetUrl;
		this.userId = userId;
		this.addSpeakerNode = addSpeakerNode;
		this.speakers = [];
		
		this.ajax = new Ajax();
		this.audioAuthWidget = new AudioAuthWidget();
		this.multiRecorder = null;
		this.node = document.createElement("div");
		this.contentNode = document.createElement("div");
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

Studio.prototype.setContent = function(node) {
	while (this.contentNode.firstChild) this.contentNode.removeChild(this.contentNode.firstChild);
	this.contentNode.appendChild(node);
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

	for(var i = 0; i < speakers.length; i++) {
		var speaker = speakers[i];
		this.speakersNode.appendChild(this.createOption(document.createTextNode(speaker.name), speaker));

	}
};

Studio.prototype.showSls = function(sls) {
	while (this.langsNode.firstChild) this.langsNode.removeChild(this.langsNode.firstChild);

	this.langsNode.disabled = !sls;
	this.contentNode.style.display = sls ? "" : "none";

	if (sls) {
		for(var i = 0; i < sls.length; i++) {
			var lang = sls[i].lang;
			this.langsNode.appendChild(this.createOption(document.createTextNode(lang.title), lang));

		}
	}
};

Studio.prototype.setSpeakers  = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		var speaker = new Speaker();
		speaker.set(arr[i]);
		this.addSpeaker(speaker);
	}
	this.update();
};

Studio.prototype.setCurrentSpeaker = function(speaker) {
	this.showSls(speaker ? speaker.sls : null);
};

Studio.prototype.getCurrentSpeaker = function() {
	return this.speakersNode.options[this.speakersNode.selectedIndex].data;
};

Studio.prototype.getCurrentLang = function() {
	return this.langsNode.options[this.langsNode.selectedIndex].data;
};

Studio.prototype.onchangeSpeaker = function(e) {
	this.setCurrentSpeaker(this.getCurrentSpeaker());
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
	if (this.addSpeakerNode) tr.appendChild(this.addSpeakerNode);
	table.appendChild(tr);
	
	table.appendChild(this.createRow(document.createTextNode("Langue"), this.langsNode));

	var self = this;
	this.speakersNode.onchange = function(e) { return self.onchangeSpeaker(e) };
	return table;
};

Studio.prototype.init = function() {
	this.node.className = "studio";
	
	this.node.appendChild(this.createForm());
	this.node.appendChild(this.contentNode);

	this.setContent(this.audioAuthWidget.node);

	var self = this;
	this.audioAuthWidget.onenabled = function(stream) {
		this.multiRecorder = new MultiRecorder(stream, function(sound, meta, doneCb) { self.send(sound, meta, doneCb) });
		self.setContent(this.multiRecorder.node);
	};
	this.setCurrentSpeaker(null);
};

Studio.prototype.update = function() {
	this.showSpeakers(this.speakers);
	this.onchangeSpeaker();
};

Studio.prototype.send = function send(sound, meta, doneCb) {
	var speaker = this.getCurrentSpeaker();
	var lang = this.getCurrentLang();
	if (!lang || !speaker) return;
	
	var formData = new FormData();
	formData.append("user", this.userId);
	formData.append("sound", sound.getBlob());
	formData.append("text", meta.transcript);
	if ("description" in meta) formData.append("description", meta.description);
	formData.append("speaker", speaker.id);
	formData.append("lang", lang.id);
	this.ajax.querySendData(this.targetUrl, "post", formData, function(result) {
		console.log(JSON.stringify(result));
		doneCb(result);
	}, false);
};

