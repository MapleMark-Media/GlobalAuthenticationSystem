
import express, { Request, Response } from 'express';
const authenticationController = require("../Controllers/CookieController");
const router = express.Router();

router.post("/authenticate", async function(req: Request, res: Response){
    const cookie = req.cookies.authSession;
    if (cookie) {
        res.status(200);
        return;
    }
    await authenticationController.verifyIdToken(req, res);
});

export default router;

