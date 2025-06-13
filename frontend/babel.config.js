export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current',
        browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
      },
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development'
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true,
      corejs: 3
    }]
  ]
}; 