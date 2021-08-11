import React, { useState, useMemo, useEffect } from 'react';
import {
    modalState,
    getTopicState,
    getLanguageState,
    getCountryState,
    userDetailState,
    topicState,
} from '../state/myPageState';
import {
    useRecoilValue,
    useRecoilState,
    useRecoilValueLoadable,
    useRecoilStateLoadable,
} from 'recoil';
import UserDetail from './components/UserDetail';
import { Row } from 'react-bootstrap';
import axios from 'axios';


const FormMyPage = () => {
    const [user, setAllDetail] = useRecoilState(userDetailState);
    const topicList = useRecoilValueLoadable(getTopicState);
    const languageList = useRecoilValueLoadable(getLanguageState);
    const countryList = useRecoilValueLoadable(getCountryState);
    const [checkedTopic, setcheckedTopic] = useState(new Array(15).fill(false));
    const [profileImage, setProfileImage] = useState("");
    const userId = localStorage.getItem('user_id');
    const [userDetail, setUserDetail] = useState({
        "userid": userId,
        "nationality": user.userDetail == null ? "" : user.userDetail?.nationality.code,
        "gender": user.userDetail == null ? 1 : 0,
        "nickname": user.userDetail == null ? "" : user.userDetail?.nickname,
        "description": user.userDetail == null ? "" : user.userDetail?.description,
        "fluentLanguage": user.userLanguage == null ? "" : user.userLanguage?.fluentLanguage.code,
        "nativeLanguage": user.userLanguage == null ? "" : user.userLanguage?.nativeLanguage.code,
        "wantLanguage": user.userLanguage == null ? "" : user.userLanguage?.wantLanguage.code,
        "topicList": user.topicList == [] ? [] : user.topicList,
    });
    const [selectTopic, setSelectTopic] = useState(new Set());


    const topics = useMemo(() => {
        return topicList?.state === 'hasValue' ? topicList?.contents : [];
    }, [topicList]);

    const languages = useMemo(() => {
        return languageList?.state === 'hasValue' ? languageList?.contents : [];
    }, [languageList]);

    const countries = useMemo(() => {
        return countryList?.state === 'hasValue' ? countryList?.contents : [];
    }, [countryList]);

    useEffect(() => {
        if (userDetail.topicList) {
            userDetail.topicList.map((row) => {
                setSelectTopic(selectTopic.add(row.id));
                setcheckedTopic(Object.assign(Array.from(checkedTopic), { [row.id]: checkedTopic[row.id] = true }));
            })
        }
        // console.log(checkedTopic)
        console.log(userDetail)
    }, [])


    const handleTopic = (data, e) => {
        // e.preventDefault();
        console.log(checkedTopic);
        console.log(selectTopic)

        if (checkedTopic[data]) {
            selectTopic.delete(data);
            setSelectTopic(selectTopic);
        } else {
            setSelectTopic(selectTopic.add(data));
        }
        // setcheckedTopic((checkedTopic[data] = !checkedTopic[data]));
        setcheckedTopic(Object.assign(Array.from(checkedTopic), { [data]: !checkedTopic[data] }));
    }

    // detail
    //nationality, gender, nickname, profile_image
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail({
            ...userDetail,
            [name]: value
        })

    }
    // profile_image
    const handleFileChange = (e) => {
        console.log(e.target);
        const name = e.target.name;
        setUserDetail({
            ...userDetail,
            [name]: e.target.files[0]
        }
        )
        setProfileImage(e.target.files[0])
    }

    const token = 'Bearer ' + localStorage.getItem('token');


    const handlePutSubmit = async (e) => {
        e.preventDefault();
        userDetail.topicList = Array.from(selectTopic);
        let data = userDetail;
        // data.userid = userId;
        console.log(data);
        data = JSON.stringify(data);
        console.log("Json" + data);
        //text 파일
        if (user.userDetail?.id) {
            await axios.put("http://localhost:8080/api/userdetail", data, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                console.log(res);
            })
        } else {
            await axios.post("http://localhost:8080/api/userdetail", data, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                console.log(res);
            })
        }

        if (profileImage != "") {
            const formData = new FormData();
            formData.append('id', userId);
            formData.append('multipartFile', profileImage);

            await axios.post("http://localhost:8080/api/profileimage", formData, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                console.log(res);
            })

        }


    }

    return (
        <div>
            <form onSubmit={handlePutSubmit} encType="multipart/form-data" action="/mypage">
                {/* <img src={user.userDetail?.profile_image}></img> */}
                <label for="nickname">
                    <span>nickname</span>
                    <input id="nickname" type="text" value={userDetail.nickname} name="nickname" onChange={handleChange} placeholder="insert your nickname" />
                </label>
                <br />

                <label for="gender">
                    <span>gender</span>
                    <input name="gender" type="radio" value="0" checked={userDetail.gender == 0} onChange={handleChange} />Man
                        <input name="gender" type="radio" value="1" checked={userDetail.gender == 1} onChange={handleChange} />Woman
                    </label>
                <br />

                <label for="description">
                    <span>Introduce</span>
                    <textarea id="description" name="description" onChange={handleChange} type="text" value={userDetail.description} placeholder="Introduce yourself" />
                </label>
                <br />
                <p>Topic</p>

                {topics.map((row, idx) => (
                    <button type="button" style={{ backgroundColor: checkedTopic[row.id] == true ? 'red' : '' }} key={idx + 1} onClick={(e) => handleTopic(row.id, e)}>{row.topic}</button>
                ))
                }

                <br />
                <p>Language</p>
                <select name="fluentLanguage" onChange={handleChange}>
                    {languages.map((row, idx) => (
                        <option key={idx} id={row.code} value={row.code} selected={userDetail.fluentLanguage === row.code} >
                            {row.language}
                        </option>

                    ))
                    }
                </select>
                <br />
                <select name="nativeLanguage" onChange={handleChange}>
                    {languages.map((row, idx) => (
                        <option key={idx} id={row.code} value={row.code} selected={userDetail.nativeLanguage === row.code}>{row.language}</option>
                    ))
                    }
                </select>
                <br />
                <select name="wantLanguage" onChange={handleChange}>
                    {languages.map((row, idx) => (
                        <option key={idx} id={row.code} value={row.code} selected={userDetail.wantLanguage === row.code}>{row.language}</option>
                    ))
                    }
                </select>
                <br />
                <p>Nation </p>
                <select name="nationality" onChange={handleChange}>
                    {countries.map((row, idx) => (
                        <option key={idx} id={row.code} value={row.code} selected={userDetail.nationality === row.code}>{row.name}</option>
                    ))
                    }
                </select>

                <br />
                <input type="file" accept="image/*" name="profile_image" onChange={handleFileChange} />
                <button type="submit" > update</button>
            </form>
        </div>
    );
};

export default FormMyPage;
