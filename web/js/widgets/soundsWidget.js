var SoundsWidget = function(sounds, audioRootPath) {
	Widget.call(this);
	
	this.table = new Widget().createElement("table");
	this.paginator = new PaginatorWidget();
	this.pageSize = 10;
	this.audioRootPath = audioRootPath;
	this.init();
	if (sounds) this.setSounds(sounds);
};

SoundsWidget.prototype = Object.create(Widget.prototype);
SoundsWidget.prototype.constructor = SoundsWidget;

SoundsWidget.prototype.init = function() {
	this.createElement("div").setClass("sounds")
		.appendChild(this.paginator
			.setCallback("changeposition", this, function(n) { this.show(n) })
		)
		.appendChild(this.table.setClass("nice"))
	;
};

SoundsWidget.prototype.createHeader = function() {
	return new Widget().createElement("tr")
		.appendChild(new Widget().createElement("th").appendTextNode("Locuteur"))
		.appendChild(new Widget().createElement("th").appendTextNode("Langue"))
		.appendChild(new Widget().createElement("th").appendTextNode("Transcription"))
	;
};

SoundsWidget.prototype.createSoundTr = function(sound) {
	return new Widget().createElement("tr")
		.appendChild(new Widget().createElement("td").setClass("speaker")
			.appendChild(new Widget().createElement("a")
				.appendTextNode(sound.idiolect.speaker.name)
				.addEventListener("click", this, function() { this.call("showspeaker", sound.idiolect.speaker ) })
			)
		)
		.appendChild(new Widget().createElement("td").appendTextNode(sound.idiolect.getTitle()).setClass("language"))
		.appendChild(new Widget().createElement("td").appendTextNode(sound.text).setClass("transcription"))
		.appendChild(new Widget().createElement("td")
			.appendChild(new Widget().createElement("audio")
				.setAttribute("src", this.audioRootPath + "/" + sound.wave)
				.setAttribute("controls", "true")
				.setAttribute("preload", "none")
			)
		)
		.appendChild(new Widget().createElement("th")
			.appendChild(new Widget().createElement("button")
				.setClass("details")
				.addEventListener("click", this, function() { this.call("showsound", sound ) })
			)
		)
	;
};

SoundsWidget.prototype.show = function(page) {
	this.table.clearChilds();
	
	this.table.appendChild(this.createHeader());

	for (var i = 0; i < this.pageSize; i++) {
		var key = page * this.pageSize + i;
		var arr = key < this.sounds.length ? this.sounds[key] : false;
		if (!arr) break;
		sound = new EntitySound().set(arr);
		this.table.appendChild(this.createSoundTr(sound));		
	}

};

SoundsWidget.prototype.setSounds = function(sounds) {
	this.sounds = sounds;
	this.paginator.setPosition(0, Math.ceil(sounds.length / this.pageSize));
};
