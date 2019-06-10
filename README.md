# Kushi Dashboard

[![Build Status](https://travis-ci.org/nivlaoh/kushi-dashboard.svg?branch=master)](https://travis-ci.com/nivlaoh/kushi-dashboard.svg?branch=master)

Kushi Dashboard is a general purpose admin dashboard, React-redux powered.

  - All UI components are built from scratch
  - Uses code splitting to load dynamic widgets
  - Uses subtle animations when navigating

## Demo

[View Dashboard](https://nivlaoh.github.io/kushi-dashboard/)

## Components

This repository aims to showcase different common UI components. When the project gets more mature, each shared component will have its own docs.

  - Alert
  - Button
  - Card
  - Checkbox
  - Dialog
  - FileUpload
  - Loader
  - MultiSelect/Dropdown
  - ProgressBar
  - RadioButton
  - Search
  - Stepper
  - Tabs
  - TextBox
  - Toast
  - Tooltip

### Components - documentation

This project uses react-styleguidist for dynamic generation of components documentation.
Start the styleguide server below

```sh
$ npm run styleguide
```

Open `localhost:6060` to view the documentation

## Installation

Kushi Dashboard requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server. Open `localhost:3020` to view it in development mode.

```sh
$ cd kushi-dashboard
$ npm install
$ npm start
```

For production environments. It serves the resources at context root `/kushi-dashboard`

```sh
$ npm run build
```

## Plugins

Kushi Dashboard is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Lodash | [https://lodash.com/][PlDb] |
| Font Awesome Icons | [https://fontawesome.com/][PlGh] |
| MomentJS | [https://momentjs.com/docs/][PlGd] |
| Weather Icons | [https://erikflowers.github.io/weather-icons/][PlOd] |
| Axios | [https://github.com/axios/axios/blob/master/README.md][PlMe] |

## Test

Kushi Dashboard uses Jest as test runner and Enzyme for testing.

Simply run:
```sh
$ npm test
```

For test coverage
```sh
$ npm run test:coverage
```

## Building for Production
For production release:
```sh
$ npm run build
```

## Todos

 - Increase test coverage
 - Widget drag and drop
 - Backend integration
 - Minimise bundle sizing

License
----
ISC

**References**

   [node.js]: <http://nodejs.org>
   [Redux]: <https://redux.js.org/introduction/getting-started>
   [React]: <https://reactjs.org/>

   [PlDb]: <https://lodash.com/>
   [PlGh]: <https://fontawesome.com/>
   [PlGd]: <https://momentjs.com/docs/>
   [PlOd]: <https://erikflowers.github.io/weather-icons/>
   [PlMe]: <https://github.com/axios/axios/blob/master/README.md>
