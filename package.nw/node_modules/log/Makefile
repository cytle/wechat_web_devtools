
docs: index.html

index.html: lib/log.js
	dox \
		--title "Log.js" \
		--desc "Tiny logger for [NodeJS](http://nodejs.org)." \
		--ribbon "http://github.com/visionmedia/log.js" \
		lib/log.js > $@

docclean:
	rm -f index.html

.PHONY: docs docclean