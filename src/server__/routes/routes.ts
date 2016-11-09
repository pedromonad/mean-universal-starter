import { Router, Request, Response } from "express";
import path = require('path');

import ClientRoutes = require('./client');

class Routes {

    private router: Router = Router();

    getRouter(): Router {

        this.router.use("/clients", new ClientRoutes().getRouter);
        
        return this.router;
    }
}

Object.seal(Routes);
export = Routes;