// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let config = {
  url: {}
}

if (NODE_ENV === 'production') {
  config.url.api = `https://${process.env.HOST}/`; 
} else {
  config.url.api = '/'
}

export default config
