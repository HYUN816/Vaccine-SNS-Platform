import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";

function EditProfileContainer() {
	const [profileImg, setProfileImg] = useState({
		imgBase64: "",
		imgFile: null,
		imgURL: "",
	});

	const { profileInfo, setProfileInfo } = useContext(ProfileContext);
	const { gender, vaccine, degree, imgURL, age, inoDate } = profileInfo;

	const onClickAvatar = async (e) => {
		const imageFile = e.target.files[0];
		const imgBase64 = URL.createObjectURL(imageFile);
		// console.log(imageFile);
		// console.log(imgBase64);
		setProfileImg({
			...profileImg,
			imgBase64: imgBase64,
			imgFile: imageFile,
		});

		const formData = new FormData();
		formData.append("img", imageFile);
		// console.log(formData);
		try {
			const response = await client.post("/auth/profileimage", formData, {
				"Content-type": "multipart/form-data",
			});
			console.log(response);
			if (response.status === 200) {
				// setProfileImg({ ...profileImg, imgURL: response.data.imgURL });
				setProfileInfo({ ...profileInfo, imgURL: response.data.imgURL });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeInput = (e) => {
		const { value } = e.target;
		setProfileInfo({ ...profileInfo, age: value });
	};

	const onChangeDropDown = (payload) => {
		const { key, value } = payload;
		console.log(payload);
		setProfileInfo({ ...profileInfo, [key]: value });
	};

	const onChangeCalender = (date) => {
		console.log(date);
		setProfileInfo({ ...profileInfo, inoDate: date });
	};
	console.log(profileInfo);

	return (
		<EditProfile
			onChangeDropDown={onChangeDropDown}
			profileImg={profileImg}
			onClickAvatar={onClickAvatar}
			onChangeCalender={onChangeCalender}
			age={age}
			onChangeInput={onChangeInput}
		/>
	);
}

export default EditProfileContainer;
