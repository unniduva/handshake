

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
  usePublicVapidKey: "BDt3hPSENqZcMdRdZzaet3m_igCU4yEg0SFQPq5pE2RHuWvVxV8gGdIDbhiYI_AyjCvGrRgTEKw8H77UZFomCN8"
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
