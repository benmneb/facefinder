import React from 'react';

export default function Rank(props) {
	const { name, entries } = props;

	const face = Number(entries) !== 1 ? 'faces' : 'face';

	return (
		<div>
			<div className="white f3 b">Welcome, {name}</div>
			<div className="white f3 mt3 b">
				You have detected {entries} {face}.
			</div>
		</div>
	);
}
