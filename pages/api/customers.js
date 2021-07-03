import firestore from "../../lib/firestore";

export default (req, res) => {
	firestore
		.collection("customers")
		.doc("10")
		.get()
		.then((doc) => {
			res.json(doc.data());
		})
		.catch((err) => {
			res.json({ err });
		});
};
