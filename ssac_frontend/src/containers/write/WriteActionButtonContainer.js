import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import client from "../../libs/api/_client";
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import { ToastsStore } from "react-toasts";

const WriteActionButtonsContainer = ({ history }) => {
	// const dispatch = useDispatch();

	const [isEdit, setIsEdit] = useState(false);
	const { postInfo, setPostInfo, resetPost } = useContext(PostContext);
	const dropDownMap = {
		후기: 0,
		팁: 1,
		등등: 2,
	};

	function getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	// useEffect(() => {
	// 	const { originalPostId } = postInfo;
	// 	if (originalPostId) {
	// 		// 수정
	// 		setIsEdit(true);
	// 		async function getData() {
	// 			// console.log(postInfo.originalPostId);
	// 			const response = await client.get(`/posts/${postInfo.originalPostId}`);
	// 			console.log(response);
	// 			const result = response.data.data;
	// 			const { title, content, tags, category } = result;

	// 			setPostInfo({
	// 				...postInfo,
	// 				title: title,
	// 				body: content,
	// 				category: getKeyByValue(dropDownMap, category),
	// 				tags: tags,
	// 				updateDate: new Date(),
	// 			});
	// 		}
	// 		getData();
	// 	} else {
	// 		// 생성
	// 		setIsEdit(false);
	// 	}
	// }, []);

	const onPublish = async () => {
		try {
			const response = await client.post("/posts", {
				title: postInfo.title,
				content: postInfo.body,
				tags: postInfo.tags,
				category: postInfo.category,
				publishedDate: new Date(),
			});
			if (response.status === 200) {
				resetPost();
				history.push("/");
				ToastsStore.success("작성 완료");
			}
		} catch (error) {
			console.log(error);
			ToastsStore.warning("제목 및 내용 미입력");
		}
	};

	// console.log(isEdit);
	const onCancel = () => {
		history.goBack();
	};

	return (
		<WriteActionButtons
			isEdit={isEdit}
			onPublish={onPublish}
			onCancel={onCancel}
		/>
	);
};

export default withRouter(WriteActionButtonsContainer);
