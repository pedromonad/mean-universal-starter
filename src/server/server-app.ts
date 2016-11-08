import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Promise from 'bluebird';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compress from 'compression';
import * as  methodOverride from 'method-override';
import * as httpStatus from 'http-status';

import ClientRoutes = require('./routes/client');
// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from '../app/app.node.module';

export class ServerApp {

    private _App: express.Express;
    private root: string;
    
    constructor() {
        this._App = express();  
        this.root = path.join(path.resolve(__dirname, '..'));      
    }
    
    public setRoutes() {     
           
        // Express View
        this._App.engine('.html', createEngine({
            precompile: true,
            ngModule: MainModule,
            providers: [
                // stateless providers only since it's shared
            ]
        }));
        this._App.set('port', process.env.PORT || 3000);
        this._App.set('views', __dirname);
        this._App.set('view engine', 'ejs');

        // secure this._Apps by setting various HTTP headers
        this._App.use(helmet());
        
        // enable CORS - Cross Origin Resource Sharing
        this._App.use(cors());



        // parse body params and attache them to req.body
        this._App.use(bodyParser.json());
        this._App.use(bodyParser.urlencoded({ extended: true }));

        this._App.use(cookieParser());
        this._App.use(compress());
        this._App.use(methodOverride());

        this._App.use(cookieParser('Angular 2 Universal'));
        this._App.use(bodyParser.json());

        console.log(path.join(this.root, '../dist/client'));
        // Serve static files
        this._App.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
        this._App.use(express.static(path.join(this.root, '../dist/client'), {index: false}));

     
        // mount all routes on /api path
        this._App.use('/api/clients', new ClientRoutes().getRouter);
        this._App.get('/', this.ngApp);
        this._App.get('/home', this.ngApp);
        this._App.get('/home/*', this.ngApp);
        this._App.get('/no-content', this.ngApp);
        this._App.get('/no-content/*', this.ngApp);
        this._App.get('/clientes/', this.ngApp);
        this._App.get('/clientes/*', this.ngApp);
        this._App.get('/visitas/', this.ngApp);
        this._App.get('/visitas/*', this.ngApp);
        this._App.get('/login/', this.ngApp);
        this._App.get('/login/*', this.ngApp);

        this._App.get('*', function(req, res) {
            res.setHeader('Content-Type', 'this._Application/json');
            var pojo = { status: 404, message: 'No Content' };
            var json = JSON.stringify(pojo, null, 2);
            res.status(404).send(json);
        });


        // catch 404 and forward to error handler
        this._App.use((req, res, next) => {
            const err = new Error('API not found ' + httpStatus.NOT_FOUND);
            return next(err);
        });
    
        
    }

    public ngApp(req, res) {
        return Promise.resolve()
            .then(() => {
                res.render('../index', {
                    req,
                    res,
                    preboot: false,
                    baseUrl: '/',
                    requestUrl: req.originalUrl,
                    originUrl: 'http://localhost:3000',
                });
            });
    }





    public startServer() {
        this._App.listen(3000, function () {
            console.log('App listening on port 3000!');
        });
    }
}