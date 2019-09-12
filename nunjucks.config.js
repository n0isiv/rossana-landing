module.exports = {
    root: './src/html',
    data () {
      return {
        lang: process.env.I18N_LANGUAGE || 'en'
      }
    }
}