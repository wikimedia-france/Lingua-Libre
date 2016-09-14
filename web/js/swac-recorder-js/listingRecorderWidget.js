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

ListingRecorderWidget.prototype.setList = function(list) {
	for (var i = 0; i < list.length; i++) {
		this.listing.push(new ListingWidgetItem(list[i]));
	}
};

ListingRecorderWidget.prototype.init = function() {
	var self = this;
	this.node.className = "listingRecorder";
	this.node.appendChild(this.recorder.node);
	this.node.appendChild(this.listing.node);
	this.node.onkeydown = function(e) { return self.onkeydown(e) };

	this.recorder.cutter.onsave = function(buffers) { return self.save(buffers); };
};

ListingRecorderWidget.prototype.save = function(buffers) {
	var current = this.listing.getCurrent();
	this.sendCb(
		buffers.getSound(),
		{
			"transcript": current.str,
		},
		function(success) {
			current.setSent(true);
		}
	);

	if (this.listing.getCurrent() == this.listing.getLast())
		return false;

	this.listing.incCurrentIndex(1);
	return true;
};
