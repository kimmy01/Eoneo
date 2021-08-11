import React, { useState, useEffect } from 'react';
import { getTopicState, getCountryState, getLanguageState, userDetailState } from '../state/myPageState';
import {
	useRecoilValue,
	useRecoilState,
	useRecoilValueLoadable,
	useRecoilStateLoadable,
} from 'recoil';
import UserDetail from './components/UserDetail';
import axios from 'axios';


const FormMyPage = () => {
	const [userDetail, setUserDetail] = useRecoilState(userDetailState);
	const [topics] = useRecoilState(getTopicState);
	const [languages] = useRecoilState(getLanguageState);
	const [countries] = useRecoilState(getCountryState);

	// const token = 'Bearer ' + localStorage.getItem('token');
	// const data = 'http://localhost:8080/data/';

	console.log(topics);

	// useEffect(() => {
	// 	const getTopics = async () => {
	// 		await axios
	// 			.get(data + 'topic', {
	// 				headers: {
	// 					Authorization: token,
	// 				},
	// 			})
	// 			.then((res) => {
	// 				console.log(res);
	// 				setTopics(res.data);
	// 			});
	// 	};

	// 	const getLanguages = async () => {
	// 		await axios
	// 			.get(data + 'language', {
	// 				headers: {
	// 					Authorization: token,
	// 				},
	// 			})
	// 			.then((res) => {
	// 				setLanguages(res.data);
	// 			});
	// 	};

	// 	const getCountries = async () => {
	// 		await axios
	// 			.get(data + 'country', {
	// 				headers: {
	// 					Authorization: token,
	// 				},
	// 			})
	// 			.then((res) => {
	// 				console.log(res.data);
	// 				setCountries(res.data);
	// 			});
	// 	};

	// 	getTopics();
	// 	getLanguages();
	// 	getCountries();
	// }, []);

	return (
		<div>
			<form>
				<select>
					{topics.map((row, idx) => (
						<option id={idx} value={row.topic}>
							{row.topic}
						</option>
					))}
				</select>
			</form>
		</div>
	);
};

export default FormMyPage;
