module.exports = {
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
  webpackConfig: require('./webpack.config.dev.js')
};
