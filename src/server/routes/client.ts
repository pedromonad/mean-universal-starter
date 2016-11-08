import { Router, Request, Response } from "express";
import ClientController = require('../controllers/client');
import CommentController = require('../controllers/comment');
import express = require("express");

var router = express.Router();
class ClientRoutes {

    //private router: Router = Router();
    private _clientCtrl: ClientController;
    private _commentCtrl: CommentController;

    contructor(){
       this._clientCtrl = new ClientController();
       this._commentCtrl = new CommentController();
    }

    
    getRouter(): Router {
        let clientCtrl = this._clientCtrl;
        let commentCtrl = this._commentCtrl;

        router.get("/", clientCtrl.list);
        router.post("/", clientCtrl.create);
        router.put("/:clientId", clientCtrl.update);
        router.get("/:clientId", clientCtrl.get);
        router.delete("/:clientId", clientCtrl.remove);

        router.get("/:clientId/comments", commentCtrl.create);
        router.post("/:clientId/comments", commentCtrl.get);
        router.delete("/:clientId/comments/:commentId", commentCtrl.remove);

        return router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
