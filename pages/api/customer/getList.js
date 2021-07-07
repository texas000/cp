import firestore from "../../../lib/firestore";

export default (req, res) => {
	if (token < 999) {
		res.status(401).json({ err: 401, msg: "Unauthorized" });
		return;
	}
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
