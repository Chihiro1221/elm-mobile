module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    function({ addBase }) {
      addBase({
        '.van-button': {
          'background-color': 'var(--van-button-primary-background-color)'
        }
      })
    }
  ]

}
