.PHONY: build run

REPO  ?= canyoutle/wxdt
TAG   ?= latest
WEAPPS ?= ${PWD}/..
PREVIEW_PROJECT ?= wechat-v2ex

build: wechat_v Dockerfile
	docker build -t $(REPO):$(TAG) .
	docker tag $(REPO):$(TAG) $(REPO):$$(cat wechat_v)

run-preview:
	docker run -it \
		-v $(WEAPPS):/projects \
		-v $(PWD)/bin/docker-entrypoint.sh:/wxdt/bin/docker-entrypoint.sh \
		$(REPO):$(TAG) \
		sh -c "cli -l && cli -p /projects/$(PREVIEW_PROJECT)"

run:
	docker run --rm -d \
		-p 6080:80 \
		-v $(WEAPPS):/projects \
		--name wxdt-test \
		$(REPO):$(TAG)

login:
	docker exec -it wxdt-test cli -l

preview:
	docker exec -it wxdt-test cli -p /projects/${PREVIEW_PROJECT}

log:
	docker exec -it wxdt-test cat /var/log/wxdt.err.log

shell:
	docker exec -it wxdt-test bash

update:
	docker run \
		-v ${PWD}:/wxdt \
		$(REPO):update \
		/wxdt/bin/update_package_nw.sh
