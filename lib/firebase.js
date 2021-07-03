import firebase from "firebase/app";
import "firebase/auth";

// DO NOT USE THIS
const clientCredentials = {
	apiKey: process.env.F_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE,
	projectId: process.env.FIREBASE_PROJECT_ID,
	appId: process.env.FIREBASE_APP_ID,
	storageBucket: "jamesworldwide-52974.appspot.com",
};

// firebase.initializeApp(clientCredentials);
if (!firebase.apps.length) {
	firebase.initializeApp(clientCredentials);
}

export default firebase;
