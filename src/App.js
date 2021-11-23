import React from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImgLinkForm from './components/imglinkform/ImgLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Particles from 'react-particles-js';
import SignIn from './components/signin/SignIn';
import Register from './components/register/Register';
import './App.css';

const particlesOptions = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	errorMessage: '',
	loading: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
	},
};

export default class App extends React.Component {
	state = {
		...initialState,
	};

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		this.setState({ loading: false });
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = async () => {
		try {
			this.setState({
				imageUrl: this.state.input,
				errorMessage: '',
				loading: true,
			});

			const response = await fetch(
				'https://facefindr-api.herokuapp.com/imageurl',
				{
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						input: this.state.input,
					}),
				}
			);

			const image = await response.json();

			if (image) {
				try {
					const res = await fetch('https://facefindr-api.herokuapp.com/image', {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					});

					const count = await res.json();

					if (count) {
						this.setState(Object.assign(this.state.user, { entries: count }));
					}
				} catch (error) {
					console.error('While detecting image:', error);
					this.setState({ errorMessage: error.message, loading: false });
				}

				this.displayFaceBox(this.calculateFaceLocation(image));
			}
		} catch (error) {
			console.error('While detecting image url:', error);
			this.setState({ errorMessage: error.message, loading: false });
		}
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}

		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;

		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
					currentRoute={this.state.route}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImgLinkForm
							inputValue={this.state.input}
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
							loading={this.state.loading}
						/>
						<FaceRecognition
							box={box}
							imageUrl={imageUrl}
							errorMessage={this.state.errorMessage}
						/>
					</div>
				) : route === 'signin' || route === 'signout' ? (
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}
