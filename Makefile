DISTPATH = "dist/neofs/"
LANG_URL = "https://github.com/nspcc-dev/fs-neo-org-translation/archive/master.zip"
VERSION?=$(shell git describe --abbrev=4 --dirty --always)
DATE ?= "$(shell date +%y%m%d-%H%M)"
TARBALL?= "fs_neo_org_${VERSION}${SUFFIX}.tar.gz"
BUILD_FLAG ?= "--prod"

build: deps
	@echo "=> Building binary"
	@ng build $(BUILD_FLAG)
	@tar cfz $(TARBALL) -C $(DISTPATH) ./

deps:
	@npm install

.PHONY: pkgname version
pkgname:
	@echo $(TARBALL)

version:
	@echo $(VERSION)

languages:
	@rm -rf src/assets/i18n/
	@mkdir -p src/assets/i18n/
	@curl -LOk $(LANG_URL)
	@unzip -j master.zip  -d src/assets/i18n/
	@rm master.zip
