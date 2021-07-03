import firestore from "../../../lib/firestore";
import auth from "../../../lib/auth";

export default (req, res) => {
	// Create User
	auth
		.createUser({
			email: "user@example.com",
			emailVerified: false,
			password: "jwiinc",
			displayName: "Shaco Kim",
			photoURL: "https://www.mobafire.com/images/champion/square/shaco.png",
			disabled: false,
		})
		.then((userRecord) => {
			const { uid, email, displayName, photoURL } = userRecord;
			const created = userRecord.metadata.creationTime;
			createUserData(uid, { email, displayName, photoURL, created });
		})
		.then(() => {
			res.json({ msg: "success" });
		});
	// Store User Data to Database
	async function createUserData(id, data) {
		await firestore.collection("users").doc(id).set(data);
	}
};
export const config = {
	api: {
		externalResolver: true,
	},
};
