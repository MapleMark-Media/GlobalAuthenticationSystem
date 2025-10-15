import { Request, Response } from 'express';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebaseConfig";

const expiresIn = 5 * 24 * 60 * 60 * 1000;

export async function verifyIdToken(req: Request, res: Response) {
    const idToken = req.body.idToken;

    // Build Firebase credential with the Google ID token.
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential from the Google user.
    signInWithCredential(auth, credential).then((signInResult) => {
        if (signInResult.user.email && signInResult.user.email.endsWith(`${process.env.EMAIL_DOMAIN}`)) {
            res.cookie("authSession", idToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: expiresIn, // 5 days
            });
            res.status(200);
        } else {
            res.status(403);
        }
    }).catch((error) => {
        res.status(403);
    });
}