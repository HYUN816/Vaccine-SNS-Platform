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
				res.status(200).json({
					message: "회원가입 완료",
					// data:userModel
				});
			} else {
				res.status(409).json({
					message: "중복된 이메일 또는 닉네임이 존재합니다.",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "서버 에러" });
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

				res.status(200).json({
					message: "로그인 성공",
					accessToken: token,
				});
			} else {
				res.status(409).json({ message: "로그인 실패" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "서버 오류" });
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
				res.status(200).json({
					message: "회원 탈퇴 성공",
				});
			} else {
				res.status(409).json({ message: "PW 불일치" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "서버 오류" });
		}
	},

	getProfile: async (req, res) => {
		const userInfo = req.userInfo;
		userInfo.password = null;

		try {
			if (userInfo) {
				res.status(200).json({
					message: "프로필 조회 성공",
					data: userInfo,
				});
			} else {
				res.status(409).json({ message: "프로필 조회 실패" });
			}
		} catch (error) {
			console.log(error);
		}
		console.log(userInfo);
	},

	uploadImage: (req, res) => {
		const file = req.file;
		// console.log(file);
		if (file) {
			res.status(200).json({
				message: "이미지 업로드 완료",
				imgURL: file.location,
			});
		} else {
			res.status(409).json({
				message: "이미지 업로드 실패",
			});
		}
		console.error(error);
	},

	updateProfile: async (req, res) => {
		const userInfo = req.userInfo;
		const { type, age, gender, degree, inoDate, profileImage } = req.body;

		try {
			if (age && type) {
				const result = await user.findByIdAndUpdate(
					userInfo._id,
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
					res.status(503).json({
						message: "게시물이 존재하지 않습니다.",
					});
				} else {
					const payload = {
						email: result.email,
						verified: result.verified,
					};
					const token = jwtModule.create(payload);
					res.status(200).json({
						message: "수정 완료",
						data: result,
						// accessToken: token,
					});
				}
			} else {
				res
					.status(409)
					.json({ message: "백신종류 및 나이를 입력해주시기 바랍니다." });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: "서버 에러",
			});
		}
	},
};

module.exports = authController;
