.PHONY: setup dev build lint typecheck check

setup:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

typecheck:
	npx tsc --noEmit

check: typecheck lint
