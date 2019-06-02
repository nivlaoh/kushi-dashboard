# Kushi Dashboard

[![Build Status](https://travis-ci.org/nivlaoh/kushi-dashboard.svg?branch=master)](https://travis-ci.com/nivlaoh/kushi-dashboard.svg?branch=master)

Kushi Dashboard is a general purpose admin dashboard, React-redux powered.

  - All UI components are built from scratch
  - Uses code splitting to load dynamic widgets
  - Uses subtle animations when navigating

# Components

This repository aims to showcase different common UI components. When the project gets more mature, each shared component will have its own docs.

  - Loader
  - TextBox
  - MultiSelect/Dropdown
  - Search
  - Toast
  - Alert
  - Tooltip
  - Button
  - Card
  - ProgressBar
  - Checkbox
  - RadioButton
  - Tabs

### Installation

Kushi Dashboard requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd kushi-dashboard
$ npm install
$ npm start
```

For production environments...

```sh
$ npm run build
```

### Plugins

Kushi Dashboard is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Lodash | [https://lodash.com/][PlDb] |
| Font Awesome Icons | [https://fontawesome.com/v4.7.0/][PlGh] |
| MomentJS | [https://momentjs.com/docs/][PlGd] |
| Weather Icons | [https://erikflowers.github.io/weather-icons/][PlOd] |
| Axios | [https://github.com/axios/axios/blob/master/README.md][PlMe] |

### Test

Kushi Dashboard uses Jest as test runner and Enzyme for testing.

Simply run:
```sh
$ npm test
```

For test coverage
```sh
$ npm run test:coverage
```

### Building for Production
For production release:
```sh
$ npm run build
```

### Todos

 - Increase test coverage
 - Dynamic Widget layout
 - Backend integration

License
----
ISC

**References**

   [node.js]: <http://nodejs.org>
   [Redux]: <https://redux.js.org/introduction/getting-started>
   [React]: <https://reactjs.org/>

   [PlDb]: <https://lodash.com/>
   [PlGh]: <https://fontawesome.com/v4.7.0/>
   [PlGd]: <https://momentjs.com/docs/>
   [PlOd]: <https://erikflowers.github.io/weather-icons/>
   [PlMe]: <https://github.com/axios/axios/blob/master/README.md>
