var SoundsWidget = function(sounds, audioRootPath) {
	this.node = document.createElement("div");
	this.tableNode = document.createElement("table");
	this.paginator = new PaginatorWidget();
	this.pageSize = 20;
	this.audioRootPath = audioRootPath;
	this.init();
	if (sounds) this.setSounds(sounds);
};

SoundsWidget.prototype.init = function() {
	var self = this;
	
	this.node.appendChild(this.paginator.node);
	this.node.appendChild(this.tableNode);
	this.tableNode.className = "nice";
	
	this.paginator.onchangeposition = function(n) { self.show(n); };
};

SoundsWidget.prototype.createHeader = function() {
	var tr = document.createElement("tr");

	var th = document.createElement("th");
	th.appendChild(document.createTextNode("Locuteur"));
	tr.appendChild(th);
	
	var th = document.createElement("th");
	th.appendChild(document.createTextNode("Langue"));
	tr.appendChild(th);

	var th = document.createElement("th");
	th.appendChild(document.createTextNode("Transcription"));
	tr.appendChild(th);

	return tr;
};

SoundsWidget.prototype.createSoundTr = function(sound) {
	var self = this;
	var tr = document.createElement("tr");

	var td = document.createElement("td");
	tr.appendChild(td);
	var a = document.createElement("a");
	a.onclick = function() { if ("onloadspeaker" in self) self.onloadspeaker(sound.speaker) };
	td.appendChild(a);
	a.appendChild(document.createTextNode(sound.speaker.name));

	var td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(document.createTextNode(sound.lang.title));

	var td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(document.createTextNode(sound.text));

//<!--<td><audio controls="true" src="{{ asset('audio') }}/{{ sound.getFilename() }}"></audio></td>-->
	var td = document.createElement("td");
	tr.appendChild(td);
	var audio = document.createElement("audio");
	audio.src = this.audioRootPath + "/" + sound.wave;
	audio.setAttribute("controls", "true");
	td.appendChild(audio);

	var th = document.createElement("th");
	var button = document.createElement("button");
	button.className = "details";
	button.onclick = function() { if ("onloadsound" in self) self.onloadsound(sound) };
	th.appendChild(button);
	tr.appendChild(th);
			
	return tr;
};

SoundsWidget.prototype.onloadspeaker = function(speaker) {
	console.log("speaker #" + speaker.id + " " + speaker.name);
};

SoundsWidget.prototype.onloadsound = function(sound) {
	console.log("sound #" + sound.id + " " + sound.text + " " + sound.wave);
};

SoundsWidget.prototype.show = function(page) {
	while (this.tableNode.firstChild) this.tableNode.removeChild(this.tableNode.firstChild);
	this.tableNode.appendChild(this.createHeader());
	for (var i = 0; i < this.pageSize; i++) {
		var key = page * this.pageSize + i;
		var sound = key < this.sounds.length ? this.sounds[key] : false;
		if (!sound) break;
		this.tableNode.appendChild(this.createSoundTr(sound));		
	}
};

SoundsWidget.prototype.setSounds = function(sounds) {
	this.sounds = sounds;
	this.paginator.setPosition(0, Math.floor(sounds.length / this.pageSize) + 1);
};
