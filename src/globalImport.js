const API_URL1={ 
    development: 'https://service.pintogroups.in',
    production: 'http://139.5.189.164'
  }
  const NODE_ENV= import.meta.env.MODE || 'development' 
  const API_URL = API_URL1[NODE_ENV];

  window.API_URL = API_URL;
export default API_URL;  
