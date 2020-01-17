DISTPATH = "dist/neofs/"
DATE ?= "$(shell date +%y.%m.%d-%H.%M)"
TARBALL ?= "$(DATE).tar.gz"
BUILD_FLAG ?= "--prod"

build: deps
	@echo "=> Building binary"
	@ng build $(BUILD_FLAG)
	@tar cfz $(TARBALL) -C $(DISTPATH) ./

deps:
	@npm install
