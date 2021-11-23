import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face.png';

export default function Logo() {
	return (
		<div className="ma4 nt5">
			<Tilt
				className="Tilt br2 shadow-2 flex justify-center items-center-ns"
				options={{ max: 55 }}
				style={{ height: 150, width: 150 }}
			>
				<div className="Tilt-inner pa3">
					<img style={{ paddingTop: '5px' }} src={face} alt="logo" />
				</div>
			</Tilt>
		</div>
	);
}
