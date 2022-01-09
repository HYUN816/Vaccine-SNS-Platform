import React, { useContext, useEffect } from "react";
import PostsList from "../../components/posts/PostsList";
import PostsContext from "../../context/PostsContext";
import client from "../../libs/api/_client";

function PostsListContainer() {
	const { postsInfo, setPostsInfo } = useContext(PostsContext);

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const response = await client.get("/posts");

				if (response.status === 200) {
					const result = response.data.data;

					setPostsInfo({ ...postsInfo, posts: result });
					// console.log(result);
					// console.log(postsInfo);
				} else {
				}
			} catch (error) {
				console.log(error);
			}
		};
		getAllPosts();
	}, []);

	// console.log(postsInfo);
	return <PostsList posts={postsInfo.posts} />;
}

export default PostsListContainer;
