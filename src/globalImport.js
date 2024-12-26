const API_URL1={ 
    development: 'http://139.5.189.164',
    production: 'http://139.5.189.164'
  }
  const NODE_ENV= import.meta.env.MODE || 'development'
export const API_URL = API_URL1[NODE_ENV] 
