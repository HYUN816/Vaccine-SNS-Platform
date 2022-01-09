import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
	const [postInfo, setPostInfo] = useState({
		tags: [],
		title: "",
		body: "",
		category: "",
		publishedDate: null,
		updateDate: null,
		originalPostId: "",
	});
	// 숫자로 주고 싶을 때 0, null

	//originalPostId : url접근 필요없어서 분기처리 필요없다

	const resetPost = () => {
		setPostInfo({
			title: "",
			tags: [],
			body: "",
			category: "",
			originalPostId: "",
		});
	};

	return (
		<PostContext.Provider
			value={{
				postInfo,
				setPostInfo,
				resetPost,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostProvider;
