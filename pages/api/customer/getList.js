import firestore from "../../../lib/firestore";

export default (req, res) => {
	firestore
		.collection("customers")
		.orderBy("F_ID")
		.limit(100)
		.get()
		.then((snapshot) => {
			var result = [];
			snapshot.forEach((doc) => {
				result.push(doc.data());
			});
			res.json(result);
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
