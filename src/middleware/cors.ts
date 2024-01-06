import cors from 'cors';
import express from 'express';

const runCorsMiddleware = (app: express.Application) => {
  // app.use(cors())
  const corsOptions = {
    origin: [
      // 'https://cinderbuild.com', 'https://www.cinderbuild.com',
      "http://cinderbuild.com",
      "http://www.cinderbuild.com",
      "https://cinderbuild.com",
      "https://www.cinderbuild.com",
      "http://localhost:3000",
      "https://cinderbuild-fe-2-nx6vj.ondigitalocean.app",
      "https://cinderbuilddemo.herokuapp.com",
      "https://cinderbuild-admin.herokuapp.com",
      'https://cinderbuildfe-prod.herokuapp.com',
      'http://cinderbuildfe-prod.herokuapp.com',
      'https://cinderbuild-dev-001.netlify.app',
      'http://cinderbuild-dev-001.netlify.app',
      'https://cinderbuild-dev-002.netlify.app',
      'http://cinderbuild-dev-002.netlify.app',
      'http://localhost:2022/',
      'https://cinderbuild-dev.netlify.app',
      'http://cinderbuild-dev.netlify.app',
      'https://cinderbuild-admin.vercel.app',
      'http://cinderbuild-admin.vercel.app',
      'http://cinderbuild-backend-dev-xh9or.ondigitalocean.app',
      'https://cinderbuild-backend-dev-xh9or.ondigitalocean.app',
      'https://cinderbuildfe-dev-no5tq.ondigitalocean.app',
      'http://cinderbuildfe-dev-no5tq.ondigitalocean.app',
      'https://cinderbuild-admin-prod-app-uvhz2.ondigitalocean.app',
      'https://admin-prod.cinderbuild.com',
      'https://admin-dev.cinderbuild.com',
      // "http://localhost:42965",
      // "http://localhost:4200",
      // 'http://192.168.88.203'
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions))
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next()
  })
  app.options('*', cors())
}

export default runCorsMiddleware
