import React from "react";
import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";
import { useHistory } from "react-router-dom";
import { ToastsStore } from "react-toasts";

function SignUpForm() {
	const history = useHistory();

	const [error, setError] = useState("");
	const [form, setForm] = useState({
		email: "",
		password: "",
		passwordConfirm: "",
		nickName: "",
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	// console.log(form)
	const onClickSubmit = async (e) => {
		e.preventDefault();
		if (form.password === form.passwordConfirm) {
			const response = await client.post("/auth/signup", {
				email: form.email,
				password: form.password,
				nickName: form.nickName,
			});
			// console.log(response)

			try {
				if (response.status === 200) {
					ToastsStore.success("회원가입완료");
					history.push("/");
				}
			} catch (error) {
				console.log(error);
				const errStatus = error.response.status;
				if (errStatus === 409) {
					alert("중복된 이메일, 아이디가 존재합니다.");
				} else {
					alert("회원 가입 실패");
				}
			}
		} else {
			alert("비밀번호 와 비밀번호확인이 일치하지 않습니다.");
		}
	};

	return (
		<AuthForm
			onClickSubmit={onClickSubmit}
			onChangeInput={onChangeInput}
			type="register"
			error={error}
			form={form}
		/>
	);
}

export default SignUpForm;
