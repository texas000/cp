import firestore from "../../../lib/firestore";

export default (req, res) => {
	const id = req.headers.id;
	firestore
		.collection("customers")
		.doc(id)
		.get()
		.then((doc) => {
			res.json(doc.data());
		})
		.catch((err) => {
			res.json({ err });
		});
};
export const config = {
	api: {
		externalResolver: true,
	},
};
