import React from 'react';
import './category.css';
import { useRecoilState } from 'recoil';
import { getCategorySelector, tempIdState } from '../state/state.js';

function Category() {
	const [topicList] = useRecoilState(getCategorySelector);
	const [tempId, setTempId] = useRecoilState(tempIdState);

	const clickHandler = (params, e) => {
		setTempId(params);
		e.preventDefault();
	};

	return (
		<div>
			<div class='categoryOut'>
				{topicList.map((topic, id) => (
					<div
						onClick={(e) => {
							clickHandler(topic.id, e);
						}}
						class='categoryIn'>
						<div class='text'>
							<p id="topicFont" class='topic'>{topic.topic}</p>
						</div>
						<img class='categoryImg' src={topic.image} alt={topic.topic} />
					</div>
				))}
			</div>
		</div>
	);
}

export default Category;
