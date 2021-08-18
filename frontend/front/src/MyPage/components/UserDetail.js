import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import editbtn from "../../assets/mypage/edit.png";
import './userdetail.css';

const UserDetail = ({ detail }) => {
	const data = detail;
	const topicList = data.topicList;
	const userLanguage = data.userLanguage;


	let fluent;
	let native;
	let want;

	console.log(userLanguage)
	if (userLanguage != null) {
		fluent = userLanguage.fluentLanguage?.language;
		native = userLanguage.nativeLanguage?.language;
		want = userLanguage.wantLanguage?.language;
	}
	const joindate = data.joindate.split('T')[0];

	//날짜 계산 시작
	const joinYear = joindate.split('-')[0];
	const joinMonth = joindate.split('-')[1] - 1;
	const joinDate = joindate.split('-')[2]

	const startDate = new Date(joinYear, joinMonth, joinDate);
	const today = new Date();

	const gap = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
	//날짜 계산 완료

	function clicked(e) {
		window.location.href = '/update/user_detail'
	}

	return (
		<div class="detailrootbox">
			<div class="detailtextbox">
				{/* <p>{data.email}</p> */}
				{/* <p>{gap}</p> */}
				<div class="topicbox">
					{topicList.map((data) => (
						<p id="topictext" key={data.id}>{data.topic}</p>
					))}
				</div>
				<div class="languagebox">
					<p id="wantlanguage">want : {want}</p>
					<p id="fluentlanguage">fluent : {fluent}</p>
					<p id="nativelanguage">native : {native}</p>
				</div>
				<p>It's been {gap} days since You've been with EONEO.</p>
			</div>
			<div class="editbtn">
				<input type="image" onClick={clicked} src={editbtn} alt="edit" width="30px" class="editbtn"></input>
				{/* <Link to='/update/user_detail'>수정</Link> */}
			</div>
		</div>
	);
};

export default UserDetail;
