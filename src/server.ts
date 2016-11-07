// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';

// Fix Universal Style
import { NodeDomRootRenderer, NodeDomRenderer } from 'angular2-universal/node';
function renderComponentFix(componentProto: any) {
  return new NodeDomRenderer(this, componentProto, this._animationDriver);
}
NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;
// End Fix Universal Style

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';


import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import * as util from 'util';

import * as app from './config/express';
import * as config from './config/env';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from './app/app.node.module';
//import { GraphQL, GraphiQL } from './backend/graphql';

// SSR
//import { client as apolloClient } from './app/apollo.node';
//import { getAuthorQuery } from './app/author/author-data.component';



//import config from './config/env';


const debug = require('debug')('mean-universal-starter:index');


let config = {
  env: 'development',
  MONGOOSE_DEBUG: true,
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: 'mongodb://localhost/mean-angular-2-development',
  port: 3000
};


(mongoose as any).Promise = global.Promise;

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}












// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  precompile: true,
  ngModule: MainModule,
  providers: [
    // stateless providers only since it's shared
  ]
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));


//import { serverApi } from './backend/api';
// Our API for demos only
//app.get('/data.json', serverApi);

function ngApp(req, res) {
  // Init the store
  //apolloClient.initStore();

  return Promise.resolve()
    // Fetch the query to add data to the store
    //.then(() => apolloClient.query({query: getAuthorQuery}))
    // Render index.ejs
    .then(() => {
      res.render('index', {
        req,
        res,
        preboot: false,
        baseUrl: '/',
        requestUrl: req.originalUrl,
        originUrl: 'http://localhost:3000',
        // Get the data from the store
        //apolloStore: apolloClient.store.getState().apollo.data
      });
    });
}
// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);
app.get('/home', ngApp);
app.get('/home/*', ngApp);
app.get('/no-content', ngApp);
app.get('/no-content/*', ngApp);
app.get('/clientes/', ngApp);
app.get('/clientes/*', ngApp);
app.get('/visitas/', ngApp);
app.get('/visitas/*', ngApp);
app.get('/login/', ngApp);
app.get('/login/*', ngApp);


//app.use('/graphql', bodyParser.json(), GraphQL());
//app.use('/graphiql', GraphiQL());

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(app.get('port'), () => {
  debug(`Listening on: http://localhost:${server.address().port}`);
});
