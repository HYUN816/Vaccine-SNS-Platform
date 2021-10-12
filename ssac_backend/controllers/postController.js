const post = require("../models/post");
const statusCode = require("../modules/statusCode");

postController = {
	createPost: async (req, res) => {
		const userInfo = req.userInfo;
		const { title, content, tags, category } = req.body;

		const postModel = new post({
			title,
			content,
			category,
			tags,
			publishedDate: new Date(),
			writer: userInfo._id,
		});

		try {
			const result = await postModel.save();
			res.status(statusCode.OK).json({
				message: "게시물 저장 완료",
				data: result,
			});
		} catch (error) {
			res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: "서버 에러 ",
			});
		}
	},

	readAllPost: async (req, res) => {
		try {
			const result = await post.find().populate("writer", "nickName");
			if (!result) {
				res.status(statusCode.NO_CONTENT).json({
					message: "게시물이 없습니다.",
				});
			} else {
				res
					.status(statusCode.OK)
					.json({ message: "게시물 조회 성공", data: result });
			}
		} catch (error) {
			res
				.status(statusCode.INTERNAL_SERVER_ERROR)
				.json({ message: "서버 에러" });
		}
	},

	readDetailPost: async (req, res) => {
		const { id } = req.params;

		try {
			const result = await post.findById(id);
			if (!result) {
				res.status(statusCode.NO_CONTENT).json({
					message: "데이터가 없습니다.",
				});
			} else {
				res
					.status(statusCode.OK)
					.json({ message: "게시물 조회 성공", data: result });
			}
		} catch (error) {
			res
				.status(statusCode.INTERNAL_SERVER_ERROR)
				.json({ message: "서버 에러" });
		}
	},

	updatePost: async (req, res) => {
		const userInfo = req.userInfo;
		const { title, content, tags, category } = req.body;
		const { id } = req.params;

		const ownResult = await post.checkAuth({
			postId: id,
			writerId: userInfo._id,
		});
		// console.log(ownResult);
		if (ownResult === -1) {
			return res
				.status(statusCode.UNAUTHORIZED)
				.json({ message: "접근 권한이 없습니다." });
		} else if (ownResult === -2) {
			return res.status(statusCode.DB_ERROR).json({
				message: "DB 서버 에러",
			});
		}

		try {
			const result = await post.findByIdAndUpdate(
				id,
				{ title, content, tags, updatedDate: new Date(), category },
				{ new: true }
			);
			// console.log(result);
			if (result) {
				res.status(statusCode.OK).json({
					message: "수정 완료",
					data: result,
				});
			} else {
				res.status(statusCode.NO_CONTENT).json({
					message: "게시물이 존재하지 않습니다.",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: "서버 에러",
			});
		}
	},
	deletePost: async (req, res) => {
		const userInfo = req.userInfo;
		const { id } = req.params;
		// console.log(userInfo);

		const ownResult = await post.checkAuth({
			postId: id,
			writerId: userInfo._id,
		});
		// console.log(ownResult);
		if (ownResult === -1) {
			return res
				.status(statusCode.UNAUTHORIZED)
				.json({ message: "접근 권한이 없습니다." });
		} else if (ownResult === -2) {
			return res.status(statusCode.DB_ERROR).json({
				message: "DB서버 에러",
			});
		}
		try {
			await post.findByIdAndDelete(id);
			res.status(statusCode.OK).json({
				message: "삭제 성공",
			});
		} catch (error) {
			console.log(error);
			res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: "서버 에러",
			});
		}
	},
	createComment: async (req, res) => {
		const userInfo = req.userInfo;
		const { commentContent } = req.body;
		const { id } = req.params;

		// console.log(commentContent);
		const commentModel = {
			commentWriter: userInfo._id,
			commentContent: commentContent,
			commentDate: new Date(),
		};

		console.log(commentModel);

		try {
			const result = await post.findByIdAndUpdate(
				id,
				{ $push: { comments: commentModel } },
				{ new: true }
			);

			if (result) {
				res.status(statusCode.OK).json({
					message: "수정 완료",
					data: result,
				});
			} else {
				res.status(statusCode.NO_CONTENT).json({
					message: "게시물이 존재하지 않습니다.",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: "서버 에러",
			});
		}
	},
};

module.exports = postController;
