import React from 'react';

export default function Navigation(props) {
	const { onRouteChange, isSignedIn, currentRoute } = props;

	if (isSignedIn) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					onClick={() => onRouteChange('signout')}
					className="f4 link dim black underline pa3 pointer"
				>
					Sign Out
				</p>
			</nav>
		);
	}

	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{currentRoute === 'register' ? (
				<p
					onClick={() => onRouteChange('signin')}
					className="f4 link dim black underline pa3 pointer"
				>
					Sign In
				</p>
			) : (
				<p
					onClick={() => onRouteChange('register')}
					className="f4 link dim black underline pa3 pointer"
				>
					Register
				</p>
			)}
		</nav>
	);
}
