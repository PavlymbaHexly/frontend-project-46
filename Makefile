install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
gendiff:
	node bin/gendiff.js