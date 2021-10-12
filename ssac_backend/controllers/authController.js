const user = require("../models/user");
const jwtModule = require("../modules/jwtModule");
const statusCode = require("../modules/statusCode");

const authController = {
	signUp: async (req, res) => {
		const { email, password, nickName } = req.body;

		try {
			const result = await user.findOne({
				$or: [{ email }, { nickName }],
			});
			// 이렇게 쓰면 뭐가 중복되었는지 알기 어렵다
			if (!result) {
				const userModel = new user({ email, password, nickName });
				await userModel.save();
				res.status(statusCode.OK).json({
					message: "회원가입 완료",
				});
			} else {
				res.status(statusCode.CONFLICT).json({
					message: "중복된 이메일 또는 닉네임이 존재합니다.",
				});
			}
		} catch (error) {
			console.log(error);
			res
				.status(statusCode.INTERNAL_SERVER_ERROR)
				.json({ message: "DB서버 에러" });
		}
	},
	signIn: async (req, res) => {
		const { email, password } = req.body;

		try {
			const result = await user.findOne({ email, password });
			if (result) {
				const payload = {
					email: result.email,
					verified: result.verified,
				};
				const token = jwtModule.create(payload);

				res.status(statusCode.OK).json({
					message: "로그인 성공",
					accessToken: token,
				});
			} else {
				res.status(statusCode.CONFLICT).json({ message: "로그인 실패" });
			}
		} catch (error) {
			console.log(error);
			res
				.status(statusCode.INTERNAL_SERVER_ERROR)
				.json({ message: "서버 오류" });
		}
	},
	withdrawal: async (req, res) => {
		const { password } = req.body;
		const userInfo = req.userInfo;

		try {
			const result = await user.findOneAndDelete({
				_id: userInfo._id,
				password,
			});
			if (result) {
				res.status(statusCode.OK).json({
					message: "회원 탈퇴 성공",
				});
			} else {
				res.status(statusCode.CONFLICT).json({ message: "PW 불일치" });
			}
		} catch (error) {
			console.log(error);
			res
				.status(statusCode.INTERNAL_SERVER_ERROR)
				.json({ message: "서버 오류" });
		}
	},

	uploadImage: (req, res) => {
		const file = req.file;
		console.log(file);
		if (file) {
			res.status(200).json({
				message: "이미지 업로드 완료",
				imgUrl: file.location,
			});
		} else {
			res.status(400).json({
				message: "이미지 업로드 실패",
			});
		}
		console.error(error);
	},

	updateProfile: async (req, res) => {
		const userInfo = req.userInfo;
		const { type, age, gender, degree, inoDate, profileImage } = req.body;
		const { id } = req.params;

		const ownResult = await user.checkAuth({
			userId: id,
			tokenId: userInfo._id,
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
		//console.log(degree);
		//type degree
		try {
			if (age && type) {
				const result = await user.findByIdAndUpdate(
					id,
					{
						type,
						gender,
						age,
						degree,
						inoDate,
						profileImage,
						verified: "true",
					},
					{ new: true }
				);

				if (!result) {
					res.status(statusCode.NO_CONTENT).json({
						message: "게시물이 존재하지 않습니다.",
					});
				} else {
					res.status(statusCode.OK).json({
						message: "수정 완료",
						data: result,
					});
				}
			} else {
				res
					.status(200)
					.json({ message: "백신종류 및 나이를 입력해주시기 바랍니다." });
			}
		} catch (error) {
			console.log(error);
			res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: "서버 에러",
			});
		}
	},
};

module.exports = authController;
