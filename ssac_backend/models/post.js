const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	category: { type: Number, required: true, default: 0 },
	tags: [{ type: String, default: null }],
	// tags :[String]
	publishedDate: { type: Date, default: new Date() },
	//필드값이 생성될 때 newDate생성
	updatedDate: { type: Date, default: null },
	writer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	comments: [
		{
			commentWriter: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
			commentContent: { type: String, default: null },
			commentDate: { type: Date, default: new Date() },
		},
	],
});

postSchema.statics.checkAuth = async function (params) {
	const { postId, writerId } = params;
	try {
		const ownResult = await this.findOne({ _id: postId }); // 게시물의 id
		const ownId = ownResult.writer;
		// console.log(ownResult);
		// console.log(ownId);
		if (ownId.toString() !== writerId.toString()) {
			return -1;
		}
		return 1;
	} catch (error) {
		console.log(error);
		return -2;
	}
};

module.exports = mongoose.model("post", postSchema);
