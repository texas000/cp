import firebase from "firebase/app";
import "firebase/auth";

const clientCredentials = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE,
	projectId: process.env.FIREBASE_PROJECT_ID,
	appId: process.env.FIREBASE_APP_ID,
};

// firebase.initializeApp(clientCredentials);
if (!firebase.apps.length) {
	firebase.initializeApp(clientCredentials);
}

export default firebase;
