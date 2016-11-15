var Ajax = function() {
	this.status = {
		400: "Bad Request",
		401: "Unauthorized",
		404: "Not Found",
		500: "Internal Server Error",
		501: "Not Implemented"
	};
};

Ajax.prototype.query = function(uri, method, params, fct, hide_errors) {
	var this_ = this;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4) {
			status = xhttp.status;
			if (status != 200 && !hide_errors) {
				this_.error("HTTP Error", status, status in this_.status ? this_.status[status] : "");
			}
			fct(status, xhttp.responseText, xhttp.getAllResponseHeaders());
		}
	}
	xhttp.open(method, uri, true);
	xhttp.send(params);
};

Ajax.prototype.queryJSON = function(uri, method, params, fct, hide_errors) {
	this.query(uri, method, params ? JSON.stringify(params) : null, function(status, responseText) {
		result = false;
		if (status == 200) {
			result = JSON.parse(responseText);
		}
		fct(result);
	}, hide_errors);
};

Ajax.prototype.querySendData = function(uri, method, data, fct, hide_errors) {
	this.query(uri, method, data, function(status, responseText) {
		result = false;
		if (status == 200) {
			result = JSON.parse(responseText);
		}
		fct(result);
	}, hide_errors);
};

Ajax.prototype.error = function(type, code, description) {
	console.log(type + ": " + code + " (" + description+")");
};

