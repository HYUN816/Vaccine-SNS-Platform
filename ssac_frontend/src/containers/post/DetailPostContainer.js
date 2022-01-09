import React, { useState, useContext } from "react";
import DetailPost from "../../components/post/DetailPost";
import { useEffect } from "react";
import client from "../../libs/api/_client";
import { useParams } from "react-router";
import PostsContext from "../../context/PostsContext";
import PostContext from "../../context/PostContext";

function DetailPostContainer() {
	const params = useParams();
	const { postId } = params;
	// const { postInfo, setPostInfo } = useContext(PostContext);
	const [postInfo, setPostInfo] = useState([]);
	const [form, setForm] = useState("");

	useEffect(() => {
		const getDetailPost = async () => {
			try {
				const response = await client.get(`/posts/${postId}`);
				// console.log(response);
				if (response.status === 200) {
					const result = response.data.data;
					setPostInfo(result);
					// console.log(result);
				} else {
				}
			} catch (error) {
				console.log(error);
			}
		};
		getDetailPost();
	}, []);

	// console.log(postInfo);

	const onChangeInput = (e) => {
		const { value } = e.target;
		setForm(value);
		// console.log(form);
	};

	const onSubmitComment = async () => {
		try {
			const response = await client.put(`/posts/${postId}/comment`, {
				commentContent: form,
			});

			if (response.status === 200) {
				const result = await client.get(`/posts/${postId}`);
				const aa = result.data.data.comments;
				console.log(aa);
				setPostInfo({ ...postInfo, comments: aa });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<DetailPost
			postDetail={postInfo}
			onSubmitComment={onSubmitComment}
			onChangeInput={onChangeInput}
			form={form}
		/>
	);
}

export default DetailPostContainer;
