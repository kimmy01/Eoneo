import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import axios from 'axios';
const { persistAtom } = recoilPersist();

// mypage

const token = 'Bearer ' + localStorage.getItem('token');
const data = '/api/data/';

export const topicState = atom({
	key: 'topic',
	default: [],
});

export const userDetailState = atom({
	key: 'userDetail',
	default: {},
	effects_UNSTABLE: [persistAtom],
});

export const languageState = atom({
	key: 'language',
	default: [],
});

export const countryState = atom({
	key: 'country',
	default: [],
});

export const getTopicState = selector({
	key: 'topic/get',
	get: async () => {
		const res = await axios.get(data + 'topic', {
			headers: {
				Authorization: token,
			},
		});
		return res.data;
	},
	set: ({ set }, data) => {
		set(topicState, data);
	},
});

export const getLanguageState = selector({
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

export const getCountryState = selector({
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

// chat
export const myUidState = atom({
	key: 'myUidState',
	default: '',
	effects_UNSTABLE: [persistAtom],
});

export const opponentUidState = atom({
	key: 'opp_uid',
	default: '47l6q9o6i4c3k',
});

export const opponentdataState = atom({
	key: 'opp_data',
	default: {},
});

export const roomSeqState = atom({
	key: 'room_seq',
	default: '',
	effects_UNSTABLE: [persistAtom],
});

// searchfriends
const userid = localStorage.getItem('user_id');

export const categoryState = atom({
	key: 'categoryState',
	default: [],
});

export const getCategorySelector = selector({
	key: 'category/get',
	get: async () => {
		try {
			const response = await axios.get('/api/data/topic', {
				headers: { Authorization: token },
			});
			return response.data;
		} catch (err) {
			throw err;
		}
	},
	set: ({ set }, newValue) => {
		set(categoryState, newValue);
	},
});

export const userListState = atom({
	key: 'userlist',
	default: false,
});

export const getUserListState = selector({
	key: 'userlist/get',
	get: async ({ get }) => {
		try {
			const response = await axios.get('/api/topicusers', {
				headers: { Authorization: token },
				params: {
					topicid: get(tempIdState),
					userid: get(userIdState),
				},
			});
			return response.data;
		} catch (err) {
			throw err;
		}
	},
	set: ({ set }, newValue) => {
		set(userListState, newValue);
	},
});

export const tempIdState = atom({
	key: 'id',
	default: 1,
	effects_UNSTABLE: [persistAtom],
});

export const userIdState = atom({
	key: 'userid',
	default: userid,
	effects_UNSTABLE: [persistAtom],
});

export const user1IdState = atom({
	key: 'user1Id',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});

export const user1UIdState = atom({
	key: 'user1UId',
	default: '',
	effects_UNSTABLE: [persistAtom],
});

export const user2IdState = atom({
	key: 'user2Id',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});

export const user2UIdState = atom({
	key: 'user2UId',
	default: '',
	effects_UNSTABLE: [persistAtom],
});
