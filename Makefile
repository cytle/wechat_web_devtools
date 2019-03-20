.PHONY: build run

REPO  ?= canyoutle/wxdt
TAG   ?= latest
WEAPPS ?= ${PWD}/..

build: wechat_v Dockerfile
	docker build -t $(REPO):$(TAG) .
	docker tag $(REPO):$(TAG) $(REPO):$$(cat wechat_v)

run:
	docker run --rm \
		-p 6080:80 \
		-v $(WEAPPS):/weapps \
		-v $(PWD)/bin/docker-entrypoint.sh:/wxdt/bin/docker-entrypoint.sh \
		-v wxdt:/root/.config/wechat_web_devtools \
		--name wxdt-test \
		$(REPO):$(TAG) \
		cli -p /weapps/wechat-v2ex

login:
	docker run --rm \
		-p 6080:80 \
		-v $(WEAPPS):/weapps \
		-v $(PWD)/bin/docker-entrypoint.sh:/wxdt/bin/docker-entrypoint.sh \
		-v wxdt:/root/.config/wechat_web_devtools \
		--name wxdt-test \
		$(REPO):$(TAG) \
		cli -l

log:
	docker exec -it wxdt-test cat /var/log/wxdt.err.log

shell:
	docker exec -it wxdt-test bash

build-base: docker/Dockerfile-update
	cd docker; \
	docker build -f Dockerfile-update -t $(REPO):update .

update:
	docker run \
		-v ${PWD}:/wxdt \
		$(REPO):update \
		/wxdt/bin/update_package_nw.sh
