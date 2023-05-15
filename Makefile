lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	cd frontend && npm start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npx make start-frontend & npx make start-backend