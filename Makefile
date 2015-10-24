REGISTRY=https://registry.npm.taobao.org
DISTURL=https://npm.taobao.org/dist
GULP_PATH=./node_modules/.bin/gulp

install:
	@npm install \
		--registry=$(REGISTRY) \
		--disturl=$(DISTURL) && \
		bower install

build: install
	@cd f2e && npm install && npm run deploy

rebuild: clean-build build

clean-build:
	@rm -rf f2e/build && echo "Cleaned."

clean: clean-build
	@rm -rf node_modules && rm -rf f2e/node_modules
