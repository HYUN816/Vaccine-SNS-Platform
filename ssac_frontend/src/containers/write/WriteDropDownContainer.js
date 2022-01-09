import React from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import { useContext } from "react";
import PostContext from "../../context/PostContext";

function WriteDropDownContainer() {
	const { postInfo, setPostInfo } = useContext(PostContext);
	const options = ["후기", "팁", "등등"];
	// const defaultOption = postInfo.category;
	const textMap = {
		후기: 0,
		팁: 1,
		등등: 2,
	};

	const onChangeDropDown = (payload) => {
		// console.log(payload);
		const { value } = payload;
		// console.log(value);
		const text = textMap[value];
		setPostInfo({ ...postInfo, category: text });
	};

	return (
		<WriteDropDown
			options={options}
			onChangeDropDown={onChangeDropDown}
			defaultOption={postInfo.category}
		/>
	);
}

export default WriteDropDownContainer;
