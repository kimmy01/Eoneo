import React from 'react';
import './category.css';
import {useRecoilState} from 'recoil';
import {getCategorySelector, tempIdState} from './state.js';

function CategoryNY(){
    
    const [topicList] = useRecoilState(getCategorySelector);
    const [tempId, setTempId] = useRecoilState(tempIdState);

    const clickHandler = (params, e) => {
        setTempId(params);
        e.preventDefault();
    }

    return(
        <div>
            <h1>Category</h1>
            <div class="categoryOut">
            {topicList.map((topic, id) => (
                <div onClick={(e) => {clickHandler(topic.id, e)}} class="categoryIn">
                    <h4>{topic.topic}</h4>
                    <img src={topic.image} alt={topic.topic} width="300px"/>
                </div>
            ))}
            </div>
        </div>
    );
}

export default CategoryNY;