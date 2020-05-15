# Script for deploying project
# Is deployed on server and automatically triggered when there's a new commit on master

cd portfoliotracker-frontend

git fetch --all

git reset --hard origin/master

docker-compose -f docker-compose.prod.yml down

docker-compose -f docker-compose.prod.yml up -d --build
