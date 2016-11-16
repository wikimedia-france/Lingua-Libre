LIB_FILES = $(wildcard lib/*.js)
WIDGETS_FILES = $(wildcard widgets/*.js)
SWAC_RECORDER_FILES = $(wildcard swac-recorder/*.js)
ENTITIES_FILES = $(wildcard entities/*.js)
FILES = $(LIB_FILES) $(WIDGETS_FILES) $(ENTITIES_FILES) $(SWAC_RECORDER_FILES) 

all: common.min.js

#.INTERMEDIATE: common.js

common.js: $(FILES)
	cat $(FILES) > $@

%.min.js: %.js
	yui-compressor -o $@ $<

clean:
	rm --force *.js
	
dev:
	while /bin/true; do make all; sleep 1; inotifywait -r -e modify *; sleep 0.5; done

