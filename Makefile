lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	cd frontend & npm start

deploy:
	git push heroku main

start:
	npx make start-frontend