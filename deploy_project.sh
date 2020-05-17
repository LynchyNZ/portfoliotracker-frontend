# Script for deploying project
# Is deployed on server and automatically triggered when there's a new commit on master

cd portfoliotracker-frontend

git fetch --all

git reset --hard origin/master

docker-compose -f docker-compose.prod.yml down

docker-compose -f docker-compose.prod.yml up -d --build

docker network create portfoliotracker

docker network connect portfoliotracker reverseproxy

docker network connect portfoliotracker frontend-prod

docker network connect portfoliotracker graphql

docker network connect portfoliotracker db