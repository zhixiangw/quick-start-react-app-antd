import axios from 'axios'

const Axios = axios.create({
  // baseURL: '/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // token: localStorage.getItem('__movie_token')
  },
  transformRequest: function(data) {
    var bodyFormData = new FormData();
    for(var key in data){
      bodyFormData.set(key, data[key]);
    }
    return bodyFormData
  }
});

export default Axios;