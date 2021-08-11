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
					//이번에 새롭게 데이터를 입력하는 사람
					if (data.userDetail == null) {
						window.location.href = '/update/user_detail'
					} else {
						setUserAllDetail(data);
						setUserOverview({
							profile_image: data.userDetail.profile_image,
							description: data.userDetail.description,
							gender: data.userDetail.gender,
							nationality: data.userDetail.nationality,
							nickname: data.userDetail.nickname,
							username: data.username,
						});
						setUserDeatil({
							topicList: data.topicList,
							userLanguage: data.userLanguage,
							email: data.email,
							joindate: data.joindate,
						});
					}
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
