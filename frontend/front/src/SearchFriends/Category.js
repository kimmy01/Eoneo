import React from 'react';
import './category.css';
import {useRecoilState} from 'recoil';
import {getCategorySelector, tempIdState} from './state.js';

function Category(){
    
    const [topicList] = useRecoilState(getCategorySelector);
    const [tempId, setTempId] = useRecoilState(tempIdState);

    const clickHandler = (params, e) => {
        setTempId(params);
        console.log(tempId)
        e.preventDefault();
    }

    return(
        <div>
            <h1>{tempId}</h1>
            <div class="categoryOut">
            {topicList.map((topic, id) => (
                <div onClick={(e) => {clickHandler(topic.id, e)}} class="categoryIn">
                    <div class = "text"><p class="topic">{topic.topic}</p></div>
                    <img class="categoryImg" src={topic.image} alt={topic.topic} />
                </div>
            ))}
            </div>
        </div>
    );
}

export default Category;