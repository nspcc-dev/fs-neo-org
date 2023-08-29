#!/usr/bin/make -f

SHELL=bash

VERSION ?= "$(shell git describe --tags --match "v*" --abbrev=8 2>/dev/null | sed -r 's,^v([0-9]+\.[0-9]+)\.([0-9]+)(-.*)?$$,\1 \2 \3,' | while read mm patch suffix; do if [ -z "$$suffix" ]; then echo $$mm.$$patch; else patch=`expr $$patch + 1`; echo $$mm.$${patch}-pre$$suffix; fi; done)"
SITE_DIR ?= fs.neo.org
RELEASE_DIR ?= $(SITE_DIR)-$(VERSION)
RELEASE_PATH ?= $(SITE_DIR)-$(VERSION).tar.gz


$(SITE_DIR): clean
	@export HUGO_GIT_VERSION=$(VERSION); hugo --destination $(SITE_DIR)

release: $(SITE_DIR)
	@ln -sf $(SITE_DIR) $(RELEASE_DIR)
	@tar cfvhz $(RELEASE_PATH) $(RELEASE_DIR)

clean:
	@echo "Cleaning up ..."
	@rm -rf $(SITE_DIR) $(RELEASE_DIR) $(RELEASE_PATH)

release_name:
	@echo $(RELEASE_PATH)

version:
	@echo $(VERSION)
