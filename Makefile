lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	npx make -C frontend start

start-backend:
	npx start-server -a localhost -p 5001

deploy:
	git push heroku main

start:
	make start-frontend & make start-backend