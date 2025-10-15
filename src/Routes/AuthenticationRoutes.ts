
import express, { Request, Response } from 'express';
import { cookieMiddleware } from "../Middleware/CookieVerificationMiddleware";
const serviceController = require("../Controllers/ServiceController");
const authenticationController = require("../Controllers/CookieController");
const router = express.Router();
import ServiceRequest from "../Models/ServiceRequest";

router.get("/get-service/:serviceName", cookieMiddleware, async function(req: Request, res: Response){
    let serviceName = req.params.serviceName;

    let packagedRequest = new ServiceRequest(serviceName, "");
    let correspondingUrl = await serviceController.getRedirect(packagedRequest);

    if (correspondingUrl){
        res.redirect(correspondingUrl);
    } else {
        res.send(503);
    }
});

router.post("/authenticate", async function(req: Request, res: Response){
    await authenticationController.CreateCookie(req, res);
});

