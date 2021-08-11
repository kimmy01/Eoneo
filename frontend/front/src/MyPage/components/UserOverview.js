import React, { useEffect, useState } from 'react';

const UserOverview = ({ overview }) => {
	const data = overview;

	// const nationality = data.nationality;

	return (
		<div>
			{/* <img src={data.profile_image}></img> */}
			<p>{data.description}</p>
			<p>{data.gender}</p>
			<p>{data.nationality?.name}</p>
			<p>{data.nickname}</p>
			<p>{data.username}</p>
		</div>
	);
};

export default UserOverview;
