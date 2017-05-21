var ListingRecorderWidget = function(stream, sendCb) {
	var self = this;
	this.sendCb = sendCb;
	this.node = document.createElement("div");
	this.recorder = new CutterWidget(stream, function() { self.save() });
	this.listing = new ListingWidget();
	this.init();
};

ListingRecorderWidget.prototype.save = function() {
	console.log("save");
};

ListingRecorderWidget.prototype.onkeydown = function(e) {
	switch (e.keyCode) {
		case 32: 
			this.recorder.startStop();
			return false;
	}
};
ListingRecorderWidget.prototype.rtl = function(active) {

    if(active){
       jQuery(this.node).css("direction","rtl");
    }
    else{
	jQuery(this.node).css("direction","ltr");
    }
};


ListingRecorderWidget.prototype.setList = function(list) {
	this.listing.setList(list);
};

ListingRecorderWidget.prototype.init = function() {
	var self = this;
	this.node.className = "listingRecorder";
	this.node.appendChild(this.recorder.node);
	this.node.appendChild(this.listing.node);
	this.node.onkeydown = function(e) { return self.onkeydown(e) };

	this.recorder.cutter.onsave = function(buffers) { return self.save(buffers); };
	this.recorder.onstatechange = function(state) { self.setState(state) };
	this.listing.showSound = function(sound) { if ("showSound" in self) self.showSound(sound) };
};

ListingRecorderWidget.prototype.setState = function(state) {
	this.listing.setRecording(state);
};

ListingRecorderWidget.prototype.save = function(buffers) {
	var current = this.listing.getCurrent();
	if (!current) return false;
	current.setSending(true);
	
	this.sendCb(
		buffers.getSound(),
		{
			"transcript": current.str,
			"id": current.sound ? current.sound.id : false
		},
		function(response) {
			current.setSuccess(response.success);
			if (response.success) current.setSound(response.sound);
		}
	);

	if (this.listing.getCurrent() == this.listing.getLast())
		return false;

	this.listing.incCurrentIndex(1);
	return true;
};
