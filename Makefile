DISTPATH = "dist/neofs/"
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

.PHONY: pkgname
pkgname:
	@echo $(TARBALL)
