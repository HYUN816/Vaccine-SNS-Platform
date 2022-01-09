import React from "react";
import styled from "styled-components";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import DefaultAvatar from "../../../assets/global/profile.png";
import dayjs from "dayjs";

const CommentItemWrap = styled.div``;

const CommentItemBlock = styled.div`
	padding: 1rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileWrap = styled.div`
	display: flex;
`;

const ProfileImageWrap = styled.div`
	width: 1.5rem;
	height: 1.5rem;
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
const CommentItemInfoWrap = styled.div`
	display: flex;
	align-items: center;
	margin-left: 0.7rem;
`;

const CommentItemDate = styled.div`
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
		margin-right: 0.6rem;
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

const CommentContent = styled.div`
	margin-top: 1.5rem;
	margin-bottom: 1rem;
	font-size: 1.3rem;
`;

function CommentItem({ comment }) {
	const { commentContent, commentDate, commentWriter } = comment;
	const formatDate = dayjs(commentDate).format("YYYY-MM-DD / HH:MM");

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
		<CommentItemBlock>
			<ProfileWrap>
				<ProfileImageWrap>
					{commentWriter && commentWriter.profileImage ? (
						<ProfileImage src={commentWriter.profileImage} />
					) : (
						<ProfileImage src={DefaultAvatar} />
					)}
				</ProfileImageWrap>
				<CommentItemInfoWrap>
					<ProfileInfoWrap>
						<span className="nickName">
							{commentWriter && commentWriter.nickName}
							{commentWriter && commentWriter.gender === "male" ? (
								<StyledMaleIcon />
							) : (
								<StyledFemaleIcon />
							)}
						</span>
						<span className="profile">
							{" "}
							{commentWriter && getKeyByValue(typeMap, commentWriter.type)}
						</span>
						<span className="dot">·</span>
						<span className="profile">
							{" "}
							{commentWriter && getKeyByValue(degMap, commentWriter.degree)}
						</span>
						<span className="dot">·</span>
						<span className="profile">
							{commentWriter && parseInt(commentWriter.age / 10)}0대
						</span>
					</ProfileInfoWrap>
					{/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
				</CommentItemInfoWrap>
			</ProfileWrap>
			<CommentContent>{commentContent}</CommentContent>
			<CommentItemDate>{formatDate}</CommentItemDate>
		</CommentItemBlock>
	);
}

function CommentItemList({ comments }) {
	return (
		<CommentItemWrap>
			{comments &&
				comments.map((comment, index) => {
					return <CommentItem comment={comment} />;
				})}
		</CommentItemWrap>
	);
}

export default CommentItemList;
