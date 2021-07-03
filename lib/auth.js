import admin from "firebase-admin";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
		databaseURL: process.env.FIREBASE_DATABASE,
	});
}
export default admin.auth();
