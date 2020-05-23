

const serverPath = {
  development: "",
  staging: "",
  production: "",
}


const server = serverPath[process.env.REACT_APP_ENV || "development"]
let all = {
  routes: {
    home: "/", 
  },
  logoURL: "", 
  defaultLimit: 10,
  api: `${server}/v1`, 
}

let env = {
  development: {
    cookies: {
      name: 'handshake',
      language: 'lng',
      expiry: 7,
      domain: ""
    }
  },
  staging: {
    cookies: {
      name: 'handshake',
      language: 'lng',
      expiry: 7,
      domain: ""
    }
  },
  production: {
    cookies: {
      name: 'handshake',
      language: 'lng',
      expiry: 7,
      domain: ""
    }
  }
};

export default {
  ...all,
  ...env[process.env.REACT_APP_ENV || "development"]
};
