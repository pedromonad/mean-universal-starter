import { Router, Request, Response } from "express";
import ClientController = require('../controllers/client');
import CommentController = require('../controllers/comment');
import express = require("express");

//var router = express.Router();
class ClientRoutes {

    private router: Router = Router();
    private _clientCtrl: ClientController;
    private _commentCtrl: CommentController;

    contructor(){
       this._clientCtrl = new ClientController();
       this._commentCtrl = new CommentController();
    }

    
    getRouter(): Router {
        let clientCtrl = this._clientCtrl;
        let commentCtrl = this._commentCtrl;

        this.router.get("/", clientCtrl.list);
        this.router.post("/", clientCtrl.create);
        this.router.put("/:clientId", clientCtrl.update);
        this.router.get("/:clientId", clientCtrl.get);
        this.router.delete("/:clientId", clientCtrl.remove);

        this.router.get("/:clientId/comments", commentCtrl.create);
        this.router.post("/:clientId/comments", commentCtrl.get);
        this.router.delete("/:clientId/comments/:commentId", commentCtrl.remove);

        return this.router;
    }
}

Object.seal(ClientRoutes);
export = ClientRoutes;
