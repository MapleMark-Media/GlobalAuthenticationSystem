import { Request, Response, NextFunction } from 'express';
const admin = require('../config/firebaseadmin');


export const cookieMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.session;

    try {
        const decoded = await admin.auth().verifySessionCookie(cookie, true);
    } catch {
        res.status(401);
    }
    next();
};