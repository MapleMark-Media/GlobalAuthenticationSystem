import { Request, Response, NextFunction } from 'express';
const admin = require("../config/firebaseadmin");

export async function CreateCookie(req: Request, res: Response){
    const verificationToken = req.body.idToken;

    try {
        const decoded = await admin.auth().verifyIdToken(verificationToken, true);
        const mmmDomain = "maplemarkmedia.com";

        if (!decoded.email.endsWith(`@${mmmDomain}`)){
            return res.status(403);
        }

        const expiration = 60 * 60 * 24 * 3 * 1000;

        const cookie = await admin.auth().createSessionCookie(verificationToken, { expiration });

        res.cookie("session", cookie, {
            maxAge: expiration,
            httpOnly: true,
            secure: true,
        });

        res.json({ success: true });
    } catch (e){
        res.status(401);
    }
}