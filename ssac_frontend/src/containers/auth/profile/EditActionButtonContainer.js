import React, { useContext } from "react";
import EditActionButtons from "../../../components/auth/profile/EditActionButtons";
import ProfileContext from "../../../context/ProfileContext";
import { ToastsStore } from "react-toasts";
import client from "../../../libs/api/_client";
import { useHistory } from "react-router";

function EditActionButtonContainer() {
	const history = useHistory();
	const { profileInfo } = useContext(ProfileContext);

	const onEdit = async () => {
		try {
			const response = await client.put("/auth/profile", {
				type: profileInfo.vaccine,
				gender: profileInfo.gender,
				degree: profileInfo.degree,
				profileImage: profileInfo.imgURL,
				age: profileInfo.age,
				inoDate: profileInfo.inoDate,
			});
			if (response.status === 200) {
				history.push("/");
				ToastsStore.success("로그인 완료");
			} else {
			}
		} catch (error) {
			ToastsStore.warning("백신종류 및 나이 입력바랍니다");
			console.log(error);
		}
	};
	return <EditActionButtons onEdit={onEdit} />;
}

export default EditActionButtonContainer;
