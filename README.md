## Portfolio Tracker Frontend

### Project Links

- [Slack](https://lynchyworkspace.slack.com/)
- [Confluence](https://lynchy.atlassian.net/wiki/spaces/PT/overview/)
- [JIRA](https://lynchy.atlassian.net/browse/PT)
- [Support](https://lynchy.atlassian.net/servicedesk)
- [Status page](https://lynchy.statuspage.io/)

### Prerequisites for local development

- Node, npm/Yarn, Git, IDE (VS Code recommended)

### Stack

- React
- Apollo Client
- TypeScript
- D3.js

### Tools

- Docker
- Circle CI

### Docker

You can run the front-end in a Docker container using the following commands:

- `docker-compose -f docker-compose.dev.yml up -d --build`

  Builds the frontend in development mode (npm start)<br>
  Open [http://localhost:3001/](http://localhost:3001/) to view it in the browser

- Prod:
  `docker-compose -f docker-compose.prod.yml up -d --build`

  Builds the frontend in production mode (npm run build with an nginx server)

  Open [http://localhost:1337/](http://localhost:1337/) to view it in the browser

### Commands

- `npm start`

  Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. (will auto reload)

- `npm test`

  Launches the test runner in the interactive watch mode.

- `npm run build`

  Builds and bundles the app for production to the `build` folder. (optimised and minified for best performance)
