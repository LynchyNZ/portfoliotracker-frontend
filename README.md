## Portfolio Tracker Frontend

This is the frontend project for a Portfolio Tracker app, used alongside [Portfolio Tracker Backend](https://github.com/LynchyNZ/portfoliotracker-backend)

### Project Links

- [GitHub Frontend](https://github.com/LynchyNZ/portfoliotracker-frontend)
- [GitHub Backend](https://github.com/LynchyNZ/portfoliotracker-backend)
- [Slack](https://lynchyworkspace.slack.com/)
- [Confluence](https://lynchy.atlassian.net/wiki/spaces/PT/overview/)
- [JIRA](https://lynchy.atlassian.net/browse/PT)
- [Support](https://lynchy.atlassian.net/servicedesk)
- [Status page](https://lynchy.statuspage.io/)

### Project Stack

- React (with TypeScript)
- GraphQL
- Postgraphile
- Docker

### Setup Local Environment

1) Clone Repos:
- `git clone https://github.com/LynchyNZ/portfoliotracker-frontend.git`
- `git clone https://github.com/LynchyNZ/portfoliotracker-backend.git`

2) Get updated copy of files where sensitive info has been removed (keys, DB credentials and schemas)
- (message Lynchy on [Slack](https://lynchyworkspace.slack.com/))

3) Install Docker

4) Run the following to build Docker containers for frontend (Dev) and backend:
`docker-compose up -d` (in portfolio-backend folder)
`docker-compose -f docker-compose.dev.yml up -d --build` (in portfoliotracker-frontend folder)

5) View app at
[http://localhost:3001/](http://localhost:3001/)
and the graphiQL tool at
  [http://localhost:5433/graphiql](http://localhost:5433/graphiql)

### Frontend-specific Docker instructions

You can run the React app in a Docker container:

- Dev:
  `docker-compose -f docker-compose.dev.yml up -d --build`

  Builds the frontend in development mode (npm start)<br>
  Open [http://localhost:3001/](http://localhost:3001/) to view it in the browser

- Prod:
  `docker-compose -f docker-compose.prod.yml up -d --build`

  Builds the frontend in production mode (npm run build with an nginx server)
  Open [http://localhost:1337/](http://localhost:1337/) to view it in the browser

### Non-Docker Local Environment (node required)

- `npm start`

  Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. (will auto reload)

- `npm test`

  Launches the test runner in the interactive watch mode.

- `npm run build`

  Builds and bundles the app for production to the `build` folder. (optimised and minified for best performance)
