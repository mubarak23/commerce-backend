import axios from 'axios'

// let baseUrl = 'http://localhost:3000'
let baseUrl = 'http://192.168.88.203:3000'
// let baseUrl = 'http://192.168.43.149:3000'
if(process.env.NODE_ENV === 'production') {
  baseUrl = 'https://www.betkonsult.com'
}

export let apiBaseUrl = baseUrl

export const getAxiosConfig = (accessToken) => {
  let config = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    },
    // validateStatus: function (status) {
    //   // return status < 500; // Resolve only if the status code is less than 500
    //   return true
    // }
  }
  if(accessToken) {
    config.headers['x-access-token'] = accessToken
  }

  return config
}
