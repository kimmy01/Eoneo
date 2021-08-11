import { atom, selector } from 'recoil';
import axios from 'axios';

// const userId = localStorage.getItem('user_id');
const userId = localStorage.getItem('user_id');
const token = 'Bearer ' + localStorage.getItem('token');
const data = 'http://localhost:8080/data/';


const topicState = atom({
	key: 'topic',
	default: [],
});

const userDetailState = atom({
	key: 'userDetail',
	default: {},
});

const languageState = atom({
	key: 'language',
	default: [],
});

const countryState = atom({
	key: 'country',
	default: [],
});

const getTopicState = selector({
	key: 'topic/get',
	get: async () => {
		const res = await axios.get(data + 'topic', {
			headers: {
				Authorization: token,
			},
		});
		console.log(res.data);
		return res.data;
	},
	set: ({ set }, data) => {
		set(topicState, data);
	},
});

const getLanguageState = selector({
	key: 'language/get',
	get: async () => {
		const res = await axios.get(data + 'language', {
			headers: {
				Authorization: token,
			},
		});

		return res.data;
	},
	set: ({ set }, data) => {
		set(languageState, data);
	},
});

const getCountryState = selector({
	key: 'country/get',
	get: async () => {
		const res = await axios.get(data + 'country', {
			headers: {
				Authorization: token,
			},
		});
		return res.data;
	},
	set: ({ set }, data) => {
		set(countryState, data);
	},
});

export {
	topicState,
	languageState,
	countryState,
	getTopicState,
	getLanguageState,
	getCountryState,
	userDetailState,
};
