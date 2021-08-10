import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ detail }) => {
	const data = detail;
	const topicList = data.topicList;
	const userLanguage = data.userLanguage;
	const fluent = userLanguage.fluentLanguage?.language;
	const native = userLanguage.nativeLanguage?.language;
	const want = userLanguage.wantLanguage?.language;
	const joindate = data.joindate.split('T')[0];

	return (
		<div>
			<Link to='/update/user_detail'>수정</Link>
			<p>{data.email}</p>
			<p>{joindate}</p>
			{topicList.map((data) => (
				<p key={data.id}>{data.topic}</p>
			))}
			<p>fluent : {fluent}</p>
			<p>want : {want}</p>
			<p>native : {native}</p>
		</div>
	);
};

export default UserDetail;
