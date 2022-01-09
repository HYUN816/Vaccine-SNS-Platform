import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import DefaultAvatar from "../../assets/global/profile.png";
import palette from "../../libs/styles/palette";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import dayjs from "dayjs";
import Comment from "../common/comment/Comment";
import { useHistory } from "react-router-dom";

const PostsListBlock = styled(Responsive)`
	margin-top: 3rem;
	margin-bottom: 4rem;
`;

const PostsListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PostItemBlock = styled.div`
	padding: 1rem 1rem;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
	cursor: pointer;

	width: 40rem;
	box-sizing: border-box;
	@media (max-width: 768px) {
		width: 100%;
	}

	& + & {
		margin-top: 2rem;
	}
`;

const ProfileWrap = styled.div`
	display: flex;
`;

const ProfileImageWrap = styled.div`
	width: 3rem;
	height: 3rem;
	cursor: pointer;
`;

const ProfileImage = styled.img`
	height: 100%;
	min-width: 100%;
	left: 50%;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.05);
	position: relative;
	border-radius: 50%;
	transform: translateX(-50%);
`;
const PostItemInfoWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 0.7rem;
`;

const PostItemDate = styled.div`
	font-size: 1.1rem;
	color: grey;
	margin-top: 0.3rem;
`;

const ProfileInfoWrap = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.3rem;
	.nickName {
		font-weight: bold;
		margin-right: 0.7rem;
	}
	.profile {
		color: grey;
	}
	.dot {
		margin: 0 0.2rem;
	}
`;

const StyledMaleIcon = styled(BsGenderMale)`
	font-weight: bolder;
	vertical-align: bottom;
	color: blue;
	stroke: blue;
	stroke-width: 0.7px;
`;
const StyledFemaleIcon = styled(BsGenderFemale)`
	font-weight: bolder;
	vertical-align: bottom;
	color: red;
	stroke: red;
	stroke-width: 0.7px;
`;

const PostContentWrap = styled.div`
	margin-top: 2rem;
`;

const PostCategory = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: grey;
`;

const PostTitle = styled.div`
	font-size: 1.3rem;
	font-weight: bolder;
`;

const PostContent = styled.div`
	font-size: 1.3rem;
	margin-top: 2rem;
`;

const PostTags = styled.div`
	display: flex;
	margin-top: 2rem;
`;

const PostTagsItem = styled.div`
	font-size: 1.2rem;
	color: grey;
	& + & {
		margin-left: 0.1rem;
	}
`;

function PostItem({ post, onClickPost }) {
	const { title, writer, content, category, tags, publishedDate } = post;
	const formatDate = dayjs(publishedDate).format("YYYY-MM-DD / HH:MM");
	// console.log(post.tags);

	const cateMap = {
		후기: 0,
		팁: 1,
		등등: 2,
	};
	const degMap = {
		접종안함: 0,
		"1차": 1,
		"2차": 2,
	};

	const typeMap = {
		모더나: "MD",
		아스트라제네카: "AZ",
		화이자: "PZ",
		얀센: "JS",
	};

	const getKeyByValue = (object, value) => {
		return Object.keys(object).find((key) => object[key] === value);
	};

	return (
		<PostItemBlock onClick={onClickPost}>
			<ProfileWrap>
				<ProfileImageWrap>
					{writer && writer.profileImage ? (
						<ProfileImage src={writer.profileImage} />
					) : (
						<ProfileImage src={DefaultAvatar} />
					)}
				</ProfileImageWrap>
				<PostItemInfoWrap>
					<ProfileInfoWrap>
						<span className="nickName">
							{writer && writer.nickName}
							{writer && writer.gender === "male" ? (
								<StyledMaleIcon />
							) : (
								<StyledFemaleIcon />
							)}
						</span>
						<span className="profile">
							{writer && getKeyByValue(typeMap, writer.type)}
						</span>
						<span className="dot">·</span>
						<span className="profile">
							{writer && getKeyByValue(degMap, writer.degree)}
						</span>
						<span className="dot">·</span>
						<span className="profile">
							{writer && parseInt(writer.age / 10)}0대
						</span>
					</ProfileInfoWrap>
					{/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
					<PostItemDate>{formatDate}</PostItemDate>
				</PostItemInfoWrap>
			</ProfileWrap>
			<PostContentWrap>
				<PostCategory>
					{category && getKeyByValue(cateMap, category)}
				</PostCategory>
				<PostTitle>{title}</PostTitle>
				<PostContent dangerouslySetInnerHTML={{ __html: content }} />
				<PostTags>
					{tags &&
						tags.map((tags, index) => {
							// console.log(tags);
							return <PostTagsItem>#{tags}</PostTagsItem>;
						})}
				</PostTags>
			</PostContentWrap>
		</PostItemBlock>
	);
}

function PostsList({ posts }) {
	const history = useHistory();
	return (
		<PostsListBlock>
			<PostsListContainer>
				{posts &&
					posts.map((post, index) => {
						return (
							<PostItem
								key={index}
								onClickPost={() => history.push(`/post/${post._id}`)}
								post={post}
							/>
						);
					})}
			</PostsListContainer>
		</PostsListBlock>
	);
}

export default PostsList;
