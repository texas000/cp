import firestore from "../../lib/firestore";
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

export default async (req, res) => {
	//POST
	// SECURE THE API (KEY)
	const auth = req.headers.authorization;

	if (req.method != "POST") {
		res.status(403).json({ err: 403, msg: "Method Not Allowed" });
		return;
	}
	if (auth !== process.env.API_KEY) {
		res.status(401).json({ err: 401, msg: "Unauthorized" });
		return;
	}
	const body = JSON.parse(req.body);
	// UPDATE USER INFORMATION
	await firestore
		.collection("users")
		.doc(body.uid)
		.update({
			...body,
			signIn: new Date(),
		});
	await firestore
		.collection("users")
		.doc(body.uid)
		.get()
		.then((doc) => {
			const token = jwt.sign(doc.data(), process.env.API_KEY, {
				expiresIn: "10h", // it will be expired after 10 hours
				//expiresIn: "20d" // it will be expired after 20 days
				//expiresIn: 120 // it will be expired after 120ms
				//expiresIn: "120s" // it will be expired after 120s
			});
			// res.setHeader("Set-Cookie", cookie.serialize("jwitoken", token));
			const serializedToken = cookie.serialize("jwitoken", token);
			res.json({ token: serializedToken });
		});
};
