import React from "react";
import { useContext } from "react";
import Editor from "../../components/write/Editor";
import PostContext from "../../context/PostContext";

function EditorContainer() {
	const { postInfo, setPostInfo } = useContext(PostContext);
	// console.log(postInfo);
	const { title, body } = postInfo;

	const onChangeField = (payload) => {
		const { key, value } = payload;
		setPostInfo({
			...postInfo,
			[key]: value,
		});
	};

	return (
		<Editor
			postInfo={postInfo}
			title={title}
			body={body}
			onChangeField={onChangeField}
		/>
	);
}

export default EditorContainer;
