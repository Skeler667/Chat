lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	-C frontend start

start-backend:
	npx start-server localhost 5001

deploy:
	git push heroku main

start:
	make start-frontend & make start-backend