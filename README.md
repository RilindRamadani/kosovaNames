# Kosova Names Graph

This project is a data visualization tool built with React and TypeScript. It allows users to search for a name ("emri") and displays a stacked or overlayed area chart based on the search results.

The data received are from ASK. [ASK](https://ask.rks-gov.net/NameSearch)

## Features

- **Search**: Users can search for multiple names and the results will be displayed on the graph. The search input is dynamic and users can add or remove search inputs as needed.
- **Dynamic Graph**: The graph updates dynamically based on the search results. Each name searched has its own area in the graph.
- **Graph Type Toggle**: Users can toggle between a stacked area chart and an overlayed area chart.
- **Custom Tooltip**: The graph includes a custom tooltip that displays the year and the value for each name at that point in the graph.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that adds types and other features to the language.
- **Recharts**: A composable charting library built on React components.

## Setup

To run this project, install it locally using npm:
```
$ cd ../web

$ npm install

$ npm start

$ cd ../proxy

$ npm install

$ node server.js
```
The project will be available at `http://localhost:3000`.

## Future Improvements

- Add more types of graphs.
- Improve the search functionality to include more parameters.
- Make the graph responsive for better mobile support.

![image](https://github.com/RilindRamadani/kosovaNames/assets/43218387/f357a7a2-b4d1-465b-9fb9-baf95dbaa434)

![image](https://github.com/RilindRamadani/kosovaNames/assets/43218387/54ee63c7-3c09-4c7a-9c1d-1b1956f5e06a)
