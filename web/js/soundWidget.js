var SoundWidget = function(sound, sendCb) {
	this.sound = sound;
	this.sendCb = sendCb;
	this.node = document.createElement("div");
	this.nodeSave = document.createElement("a");
	this.nodePlay = document.createElement("button");
	this.nodeDiscard = document.createElement("button");
	this.nodeSend = document.createElement("button");
	this.nodeCanvas = document.createElement("canvas");
	this.nodeText = document.createElement("input");
	this.nodeDescription = document.createElement("textarea");
	this.nodeTools = document.createElement("div");

	this.player = new Player(sound);
	this.init();
}


SoundWidget.prototype.init = function() {
	var obj = this;
	this.node.className = "soundWidget";

	//Canvas
	this.node.appendChild(this.nodeCanvas);
	this.nodeCanvas.width = 512;
	this.nodeCanvas.height = 128;
	this.draw(this.nodeCanvas.getContext('2d'), this.nodeCanvas.width, this.nodeCanvas.height);

	//Tools
	this.nodeTools.className = "tools";
	this.node.appendChild(this.nodeTools);

	//Bouton "Play"
	this.nodePlay.appendChild(document.createTextNode("Écouter"));
	this.nodeTools.appendChild(this.nodePlay);
	this.nodePlay.onclick = function() {
		obj.play();
	}

	//Bouton "Send"
	this.nodeSend.appendChild(document.createTextNode("Enregistrer"));
	this.nodeTools.appendChild(this.nodeSend);
	this.nodeSend.onclick = function() {
		obj.send();
	}

	//Bouton "Discard"
	this.nodeDiscard.appendChild(document.createTextNode("Annuler"));
	this.nodeTools.appendChild(this.nodeDiscard);
	this.nodeDiscard.onclick = function() {
		obj.discard();
	}

	var table = document.createElement("table");
	this.node.appendChild(table);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var th = document.createElement("th");
	tr.appendChild(th);
	th.appendChild(document.createTextNode("Transcription"));
	var td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(this.nodeText);

	var tr = document.createElement("tr");
	table.appendChild(tr);
	var th = document.createElement("th");
	tr.appendChild(th);
	th.appendChild(document.createTextNode("Description"));
	var td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(this.nodeDescription);

	//Lien "Save"
/*	this.node.appendChild(this.nodeSave);
	this.nodeSave.appendChild(document.createTextNode("Save"));

	url = window.URL.createObjectURL(this.sound.getBlob());
	this.nodeSave.href = url;
	this.nodeSave.download = "sound.wav";
*/
}

SoundWidget.prototype.destroy = function() {
	this.node.parentNode.removeChild(this.node);
	delete this;
}

SoundWidget.prototype.discard = function() {
	this.destroy();
}

SoundWidget.prototype.play = function() {
	this.player.play();
}

SoundWidget.prototype.getSound = function() {
	return this.sound;
}

SoundWidget.prototype.getText = function() {
	return this.nodeText.value;
}

SoundWidget.prototype.send = function() {
	this.sendCb(this);
}

SoundWidget.prototype.draw = function(context, width, height) {
	var step = Math.ceil(this.sound.samples.length / width);
	var amp = height / 2;
	context.fillStyle = "gray";

	for(var i=0; i < width; i++){
		var min = 1.0;
		var max = -1.0;
		for (j = 0; j < step; j++) {
			var datum = this.sound.samples[(i * step) + j]; 
			if (datum < min)
			min = datum;
			if (datum > max)
			max = datum;
		}
		context.fillRect(i,(1 + min) * amp, 1, Math.max(1, (max-min) * amp));
	}
}

