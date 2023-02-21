#!/usr/bin/make -f

SHELL=bash

LANG_URL = "https://github.com/nspcc-dev/fs-neo-org-translation/archive/master.zip"
VERSION ?= $(shell git rev-parse --short=8 HEAD)
CURRENT_UID ?= $(shell id -u $$USER)

SITE_DIR ?= fs.neo.org
RELEASE_DIR ?= $(SITE_DIR)-$(VERSION)
RELEASE_PATH ?= $(SITE_DIR)-$(VERSION).tar.gz

$(SITE_DIR): clean languages
	docker run \
	-v $$(pwd)/:/usr/src/app/ \
	-v $$(pwd)/node_modules:/usr/src/app/node_modules \
	-e CURRENT_UID=$(CURRENT_UID) \
	-w /usr/src/app node:14-alpine \
	sh -c 'npm install --legacy-peer-deps && \
		npm install -g @angular/cli && \
		ng build --prod && \
		chown -R $$CURRENT_UID: $(SITE_DIR)'

deps:
	@npm install --legacy-peer-deps

languages:
	@rm -rf src/assets/i18n/
	@mkdir -p src/assets/i18n/
	@curl -LOk $(LANG_URL)
	@unzip -j master.zip  -d src/assets/i18n/
	@rm master.zip

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
