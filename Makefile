#!/usr/bin/make -f

SHELL=bash

VERSION ?= $(shell git rev-parse --short=8 HEAD)
SITE_DIR ?= fs.neo.org
RELEASE_DIR ?= $(SITE_DIR)-$(VERSION)
RELEASE_PATH ?= $(SITE_DIR)-$(VERSION).tar.gz


$(SITE_DIR): clean
	@hugo --destination $(SITE_DIR)

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
