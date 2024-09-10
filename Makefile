.PHONY: all help initialize application certs docker-up

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

initialize: application certs
	@sudo ./docs/infra/local/scripts/hosts.sh

application:
	@brew install mysql postgresql traefik node mkcert nss watchman || true
	@npm install -g yarn corepack --force || true
	@corepack enable
	@yarn install
	@xcode-select --install || true

# install
certs:
	@mkcert -install
	@rm -rf docs/infra/local/cert && mkdir docs/infra/local/cert
	@cd docs/infra/local/cert && mkcert blankclub.work '*.blankclub.work'

docker-up:
	@docker-compose up
