import React, { useEffect, useState } from 'react';
import './useroverview.css';
import { Badge } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { blue } from '@material-ui/core/colors';

const UserOverview = ({ overview }) => {
	const data = overview;

	var gender = '';
	
	// const nationality = data.nationality;
	let location = '/static/img/' + data.profile_image;
	// let location = '/upload/' + data.profile_image;

	return (
		<div class='rootbox'>
			{/* <img src={data.profile_image}></img> */}
			<div class='imagebox'>
				{/* <img class="profileimage" src='data:image/jpeg;base64,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' alt='profil'/> */}
				<Badge
					overlap='circle'
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<img src={data.nationality?.flag} width='60px' alt='flag' />
					}>
					<img class='profileimage' src={location} alt='profile' />
				</Badge>
			</div>
			<div class='textbox'>
			{/* if (data.gender === 1) {
		gender = 'male';
	} else {
		gender = 'female';
	} */}
				{data.gender ===1 
				
					?
					<div>
						<FontAwesomeIcon style= {{color:"blue", fontSize:20, display:'inline-block'}} icon={faMars} />
						<h3 style={{display:'inline-block'}}> &nbsp {data.nickname} ({data.username})</h3>
					</div>
					:
					<div>
						<FontAwesomeIcon style= {{color: "pink",fontSize:20, display:'inline-block'}} icon={faVenus} />
						<h3 style={{display:'inline-block'}}>&nbsp {data.nickname} ({data.username})</h3>
					</div>
				
				}
				
				{/* <p>{data.username}</p> */}
				<div style={{marginTop:5}}>
					<p>Description</p>
					<p>{data.description}</p>
				</div>
				{/* <p>{gender}</p> */}
				{/* <p>{data.nationality?.name}</p> */}
				{/* <img class="flagimage" src={data.nationality?.flag} alt="flag"/> */}
			</div>
		</div>
	);
};

export default UserOverview;
