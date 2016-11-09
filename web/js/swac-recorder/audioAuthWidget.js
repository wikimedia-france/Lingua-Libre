var AudioAuthWidget = function() {
	this.node = document.createElement("div");
	this.nodeEnabled = document.createElement("div");
	this.nodeDisabled = document.createElement("div");
	this.init();
	this.initAudio();
};

AudioAuthWidget.prototype.init = function() {
	this.node.className = "audioAuth";

	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Impossible d’accèder à l’interface audio ! Peut-être n’avez-vous pas branché de microphone…"));
	p.className = "error";
	this.nodeDisabled.appendChild(p);

	var p = document.createElement("p");
	p.className = "waiting";

	var spinner = document.createElement("div");
	spinner.className = "spinner";
	p.appendChild(spinner);

	p.appendChild(document.createTextNode("Vous devez autoriser l’accès à votre carte son…"));
	
	this.node.appendChild(p);
};

AudioAuthWidget.prototype.appendChild = function(node) {
	this.nodeEnabled.appendChild(node);
};

AudioAuthWidget.prototype.setEnabled = function(value) {
	while (this.node.firstChild) this.node.removeChild(this.node.firstChild);
	this.node.appendChild(value ? this.nodeEnabled : this.nodeDisabled);
};

AudioAuthWidget.prototype.enabled = function(stream) {
	if ("onenabled" in this) this.onenabled(stream);
};

AudioAuthWidget.prototype.initAudio = function() {
	var self = this;

	navigator.getUserMediaFct = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	if (!navigator.getUserMediaFct) {
		self.setEnabled(false);
		return;
	}

	navigator.getUserMediaFct(
		{"audio": true, "video": false},

		function(localMediaStream) {
			self.enabled(localMediaStream);
			self.setEnabled(true);
		},

		function(err) {
			console.log("The following error occured: " + err);
			self.setEnabled(false);
		}
	);
};

