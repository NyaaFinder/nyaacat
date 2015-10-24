REGISTRY=https://registry.npm.taobao.org
DISTURL=https://npm.taobao.org/dist
GULP_PATH=./node_modules/.bin/gulp

install:
	@npm install \
		--registry=$(REGISTRY) \
		--disturl=$(DISTURL) && \
		bower install

build: install
	@$(GULP_PATH) build

rebuild: clean-build build

build-dev: install
	@$(GULP_PATH) build-dev

rebuild-dev: clean-build build-dev

watch: build-dev
	@$(GULP_PATH) watch

clean-build:
	@rm -rf f2e/build && echo "Cleaned."

clean: clean-build
	@rm -rf node_modules && rm -rf bower_components
