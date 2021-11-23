import React from 'react';
import Spinner from '../spinner/Spinner';

export default class Register extends React.Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		loading: false,
		errorMessage: '',
	};

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	};

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	onConfirmPasswordChange = (event) => {
		this.setState({ confirmPassword: event.target.value });
	};

	onSubmitRegister = async () => {
		try {
			this.setState({ loading: true, errorMessage: '' });

			const response = await fetch(
				'https://facefindr-api.herokuapp.com/register',
				{
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: this.state.email,
						password: this.state.password,
						name: this.state.name,
					}),
				}
			);

			const user = await response.json();

			if (!user.id) {
				this.setState({
					errorMessage: "Couldn't sign in. Check credentials and try again.",
				});
				return;
			}

			this.props.loadUser(user);
			this.props.onRouteChange('home');
			this.setState({ loading: false });
		} catch (error) {
			console.error('While trying to register:', error);
			this.setState({
				loading: false,
				errorMessage: `Could not register. ${error.message}`,
			});
		}
	};

	validate = () => {
		if (this.state.name.length < 2) {
			return this.setState({ errorMessage: 'Name too short.' });
		}

		if (!/\S+@\S+\.\S+/.test(this.state.email)) {
			return this.setState({ errorMessage: 'Invalid email.' });
		}

		if (this.state.password.length < 7) {
			return this.setState({
				errorMessage: 'Password must be at least 7 characters.',
			});
		}

		if (this.state.confirmPassword !== this.state.password) {
			return this.setState({
				errorMessage: "Password's must match.",
			});
		}

		this.onSubmitRegister();
	};

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0 w-100">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">
									Name
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
									type="text"
									name="name"
									id="name"
									value={this.state.name}
									onChange={this.onNameChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
									type="email"
									name="email-address"
									id="email-address"
									value={this.state.email}
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
									type="password"
									name="password"
									id="password"
									value={this.state.password}
									onChange={this.onPasswordChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="confirm-password">
									Confirm Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
									type="password"
									name="confirm-password"
									id="password"
									value={this.state.confirmPassword}
									onChange={this.onConfirmPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							{this.state.loading ? (
								<Spinner />
							) : (
								<input
									onClick={this.validate}
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									type="submit"
									value="Register"
								/>
							)}
						</div>
					</div>
					{this.state.errorMessage && (
						<div className="pt4 b washed-red measure">
							{this.state.errorMessage}
						</div>
					)}
				</main>
			</article>
		);
	}
}
