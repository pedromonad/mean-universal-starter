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


import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import * as util from 'util';

import { ServerApp } from './server/server-app';

// Angular 2
import { enableProdMode } from '@angular/core';


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



var serverApp = new ServerApp();

serverApp.setRoutes();

serverApp.startServer();


// enable prod for faster renders
//enableProdMode();
