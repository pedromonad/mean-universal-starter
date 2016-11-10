'use strict';

import 'angular2-universal-polyfills';
// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';
// App
import { MainModule } from './app/app.node.module';
// Fix Universal Style
import { NodeDomRootRenderer, NodeDomRenderer } from 'angular2-universal/node';
function renderComponentFix(componentProto: any) {
  return new NodeDomRenderer(this, componentProto, this._animationDriver);
}
NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;
// End Fix Universal Style


const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const httpStatus = require('http-status');
const clientRoutes = require('./server/modules/Client/routes');
const userRoutes = require('./server/modules/User/routes');
const authRoutes = require('./server/modules/Auth/routes');

let app = express();

// view engine setup
app.set('views', __dirname);
app.set('view engine', 'ejs');

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// 
app.use(compression());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//
// Express View
app.engine('.html', createEngine({
    precompile: true,
    ngModule: MainModule,
    providers: [
        // stateless providers only since it's shared
    ]
}));


//
// connect to database and register models
///////////////////////////////////////////////////////////
require('./server/lib/connectMongoose');

//
// serve static files
///////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, '../dist/client'), {index: false}));
app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {maxAge: 30}));

// web dependencies from node_modules
app.use('/nm/bootstrap',    express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/nm/jquery',       express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/nm/tether',       express.static(path.join(__dirname, '../node_modules/tether/dist')));

//
// serve API V1 routes
///////////////////////////////////////////////////////////
app.use('/apiv1/clients', clientRoutes);
app.use('/apiv1/users', userRoutes);
app.use('/apiv1/auth', authRoutes);

//
// Server-side render
//app.use('/api/clients', new ClientRoutes().getRouter);
app.get('/', ngApp);
app.get('/*', ngApp);
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

function ngApp(req, res) {
    return Promise.resolve()
        .then(() => {
            res.render('public/index', {
                req,
                res,
                preboot: false,
                baseUrl: '/',
                requestUrl: req.originalUrl,
                originUrl: 'http://localhost:3000',
            });
        });
}


// catch not handled and return 404
app.use((req, res, next) => next({
    message: 'Not Found',
    status: 404,
    stack: (new Error()).stack
}));

//
// error handlers (dev / prod)
///////////////////////////////////////////////////////////

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        if (isApi(req)) {
            res.json({success: false, error: err});
        } else {
            res.render('error', {message: err.message, error: err});
        }
    });
}

// production error handler - no stack-traces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (isApi(req)) {
        res.json({success: false, error: err});
    } else {
        const err = new Error('API not found ' + httpStatus.NOT_FOUND);
        return next(err);
    }
});



function isApi(req) {
    return req.url.indexOf('/apiv1/') === 0;
}

export = app;
