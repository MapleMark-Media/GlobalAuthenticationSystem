import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebaseConfig";

const provider = new GoogleAuthProvider();

function AuthenticationPage(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                setIsAuthenticated(true);
            }

        } catch (e) {

        }

    }, []);

    const handleGoogle = async (e) => {

        return signInWithPopup(auth, provider).then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            try {
                const idResponse = await fetch(`${process.env.BACKEND_URL}/api/authenticate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idToken: token })
                });
                if (idResponse.ok) {
                    setIsAuthenticated(true);
                }
            } catch (e) {
                if (credential.user.email && credential.user.email.endsWith(process.env.EMAIL_DOMAIN)) {
                    setIsAuthenticated(true);
                }
            }

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    }

    return (
        <div>
            {(isAuthenticated) ? props.children :
                <div >
                    <button onClick={handleGoogle} className="google-login-button">Login with Google</button>
                </div>
            }
        </div>

    );
}

export default AuthenticationPage;