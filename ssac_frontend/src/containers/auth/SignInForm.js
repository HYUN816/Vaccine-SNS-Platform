import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import AuthContext from "../../context/AuthContext";
import client from "../../libs/api/_client";
import { ToastsStore } from "react-toasts";

function SignInForm() {
	const history = useHistory();

	const { authInfo, setAuthInfo } = useContext(AuthContext);

	const [error, setError] = useState("");
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const onClickSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await client.post("/auth/signin", {
				email: form.email,
				password: form.password,
			});
			console.log(response);
			if (response.status === 200) {
				const accessToken = response.data.accessToken;
				client.defaults.headers.common["Authorization"] = `${accessToken}`;
				localStorage.setItem("accessToken", accessToken);
				//client로 보낸 모든 요청에 헤더 authorization에 엑세스 토큰을 보내겠다
				//앞으로 header{authorization:token} 안써도 된다
				const result = await client.get("/auth/profile");
				setAuthInfo({ isLoggedIn: true, userInfo: result.data.data });

				// console.log(result);

				history.push("/");
				ToastsStore.success("로그인 완료");
			} else {
				ToastsStore.warning("ID/PW 불일치");
			}
		} catch (error) {
			console.log("???");
			console.log(error);
		}
	};

	return (
		<AuthForm
			type="login"
			onClickSubmit={onClickSubmit}
			form={form}
			onChangeInput={onChangeInput}
			error={error}
		/>
	);
}

export default SignInForm;
