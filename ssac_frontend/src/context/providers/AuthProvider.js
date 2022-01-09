import { useState } from "react";
import AuthContext from "../AuthContext";

const AuthProvider = ({ children }) => {
	const [authInfo, setAuthInfo] = useState({
		isLoggedIn: false,
		userInfo: {},
	});

	return (
		// 안에 내용들을 전역으로 제공해주겠다
		// index.js에서 provider가 app을 감싸고 있다 -> 전역관리
		<AuthContext.Provider
			value={{
				authInfo,
				setAuthInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

//전역상태관리 redux,
//redux외에도 react에서도 전역상태관리 hook들이 많이 나와있다
//context api(react api hook) :
export default AuthProvider;
