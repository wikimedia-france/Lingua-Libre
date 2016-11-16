var SoundsWidget = function(sounds, audioRootPath) {
	Widget.call(this, document.createElement("div"));

	this.table = Widget.createElement("table");
	this.paginator = new PaginatorWidget();
	this.pageSize = 20;
	this.audioRootPath = audioRootPath;
	this.init();
	if (sounds) this.setSounds(sounds);
};

SoundsWidget.prototype = Object.create(Widget.prototype);
SoundsWidget.prototype.constructor = SoundsWidget;

SoundsWidget.prototype.init = function() {
	var self = this;
	
	this.node.appendChild(this.paginator.node);
	this.appendChild(this.table);
	this.table.setClass("nice");
	
	this.paginator.onchangeposition = function(n) { self.show(n); };
};

SoundsWidget.prototype.createHeader = function() {
	return Widget.createElement("tr")
		.appendChild(Widget.createElement("th").appendTextNode("Locuteur"))
		.appendChild(Widget.createElement("th").appendTextNode("Langue"))
		.appendChild(Widget.createElement("th").appendTextNode("Transcription"))
	;
};

SoundsWidget.prototype.createSoundTr = function(sound) {
	return Widget.createElement("tr")
		.appendChild(Widget.createElement("td")
			.appendChild(Widget.createElement("a")
				.appendTextNode(sound.speaker.name)
				.addEventListener("click", this, function() { this.call("showSpeaker", sound.speaker ) })
			)
		)
		.appendChild(Widget.createElement("td").appendTextNode(sound.lang.title))
		.appendChild(Widget.createElement("td").appendTextNode(sound.text))
		.appendChild(Widget.createElement("td")
			.appendChild(Widget.createElement("audio")
				.setAttribute("src", this.audioRootPath + "/" + sound.wave)
				.setAttribute("controls", "true")
				.setAttribute("preload", "none")
			)
		)
		.appendChild(Widget.createElement("th")
			.appendChild(Widget.createElement("button")
				.setClass("details")
				.addEventListener("click", this, function() { this.call("showSound", sound ) })
			)
		)
	;
};

SoundsWidget.prototype.onclickspeaker = function(sound) {
	console.log("plop");
};

SoundsWidget.prototype.show = function(page) {
	this.table.clearChilds();
	
	this.table.appendChild(this.createHeader());

	for (var i = 0; i < this.pageSize; i++) {
		var key = page * this.pageSize + i;
		var sound = key < this.sounds.length ? this.sounds[key] : false;
		if (!sound) break;
		this.table.appendChild(this.createSoundTr(sound));		
	}

};

SoundsWidget.prototype.setSounds = function(sounds) {
	this.sounds = sounds;
	this.paginator.setPosition(0, Math.ceil(sounds.length / this.pageSize));
};
