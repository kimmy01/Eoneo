import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserOverview from './components/UserOverview';
import UserDetail from './components/UserDetail';
import { userDetailState } from '../state/myPageState';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Redirect } from 'react-router-dom';

const MyPage = ({ }) => {
	// const [userId, setUserId] = useState('');
	const [userOverview, setUserOverview] = useState({
		profile_image: '',
		description: '',
		gender: '',
		nationality: {},
		nickname: '',
		username: '',
	});
	const [userDetail, setUserDeatil] = useState({
		topicList: [],
		userLanguage: {},
		email: '',
		joindate: '',
	});

	const userId = localStorage.getItem('user_id');
	const token = 'Bearer ' + localStorage.getItem('token');
	const url = 'http://localhost:8080/api/userinfo/' + userId;
	const [userAllDetail, setUserAllDetail] = useRecoilState(userDetailState);
	useEffect(() => {
		const getUserData = async () => {
			await axios
				.get(url, {
					headers: {
						Authorization: token,
					},
				})
				.then((res) => {
					const data = res.data;
					console.log(data);
					setUserAllDetail(data);
					if (data.userDetail == null) {
						alert("please insert your data first.")
						window.location.href = '/update/user_detail'
					}
					setUserOverview({
						profile_image: data.userDetail.profile_image == null ? "" : data.userDetail.profile_image,
						description: data.userDetail.description == null ? "" : data.userDetail.description,
						gender: data.userDetail.gender == null ? "" : data.userDetail.description,
						nationality: data.userDetail.nationality == null ? {} : data.userDetail.description,
						nickname: data.userDetail.nickname == null ? "" : data.userDetail.description,
						username: data.username,
					});
					setUserDeatil({
						topicList: data.topicList,
						userLanguage: data.userLanguage,
						email: data.email,
						joindate: data.joindate,
					});

				});
		};
		getUserData();
	}, []);

	return (
		<div>
			<UserOverview overview={userOverview} />
			<UserDetail detail={userDetail} />
		</div>
	);
};

export default MyPage;
