import React from "react";
import { useState } from "react";
import { useContext } from "react";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";
import { useHistory } from "react-router-dom";
import { ToastsStore } from "react-toasts";

function NavbarContainer() {
	const history = useHistory();
	const { authInfo, setAuthInfo } = useContext(AuthContext);
	const [visible, setVisible] = useState(false);

	const onClickProfileImg = () => {
		setVisible(!visible);
	};

	const onClickEditProfile = () => {
		history.push("/edit/profile");
		setVisible(false);
	};

	const onClickSignout = () => {
		localStorage.removeItem("accessToken");
		client.defaults.headers.common["Authorization"] = ``;
		setAuthInfo({
			...authInfo,
			isLoggedIn: false,
		});
		ToastsStore.success("로그아웃 완료");
		history.push("/");
		setVisible(false);
	};

	// console.log(authInfo);
	return (
		<NavbarComponent
			onClickProfileImg={onClickProfileImg}
			visible={visible}
			authInfo={authInfo}
			onClickSignout={onClickSignout}
			onClickEditProfile={onClickEditProfile}
		/>
	);
}

export default NavbarContainer;
