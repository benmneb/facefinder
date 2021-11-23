import React from 'react';
import './FaceRecognition.css';

export default function FaceRecognition(props) {
	const { imageUrl, box, errorMessage } = props;

	if (errorMessage)
		return (
			<div className="center mt4 washed-red flex flex-column">
				<div className="b f3">Error. Check image URL and try again.</div>
				<div className="mt2">({errorMessage})</div>
			</div>
		);

	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img
					id="inputimage"
					alt=""
					src={imageUrl}
					width="500px"
					height="auto"
				/>
				<div
					className="bounding-box"
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol,
					}}
				></div>
			</div>
		</div>
	);
}
