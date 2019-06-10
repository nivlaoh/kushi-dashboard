const path = require('path');
const devWebpack = require('./webpack.config.dev.js');

module.exports = {
  pagePerSection: process.env.NODE_ENV !== 'production',
  skipComponentsWithoutExample: true,
  require: [path.resolve(__dirname, 'styleguidist/setup.js')],
  template: {
    favicon: 'favicon.ico',
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Quicksand'
        }
      ]
    }
  },
  styles: {
    StyleGuide: {
      '@global body': {
        fontFamily: 'Quicksand, Arial, sans-serif'
      }
    }
  },
  sections: [
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Introduction',
          content: 'README.md'
        },
        {
          name: 'Live Demo',
          external: true,
          href: 'https://nivlaoh.github.io/kushi-dashboard'
        }
      ]
    },
    {
      name: 'App Components',
      description: 'Components used in App',
      components: 'src/components/**/[A-Z]*.jsx'
    },
    {
      name: 'Shared Components',
      components: 'src/shared/components/**/[A-Z]*.jsx'
    }
  ],
  webpackConfig: devWebpack
};
