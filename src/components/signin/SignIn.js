import React from 'react';
import Spinner from '../spinner/Spinner';

export default class SignIn extends React.Component {
	state = {
		signInEmail: '',
		signInPassword: '',
		loading: false,
		errorMessage: '',
	};

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSubmitSignIn = async () => {
		try {
			this.setState({ loading: true, errorMessage: '' });

			const response = await fetch(
				'https://facefindr-api.herokuapp.com/signin',
				{
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: this.state.signInEmail,
						password: this.state.signInPassword,
					}),
				}
			);

			const user = await response.json();

			this.setState({ loading: false });

			if (!user.id) {
				this.setState({
					errorMessage: "Couldn't sign in. Check credentials and try again.",
				});
				return;
			}

			this.props.loadUser(user);
			this.props.onRouteChange('home');
		} catch (error) {
			console.error('While signing in:', error);
			this.setState({
				loading: false,
				errorMessage: `Could not sign in. ${error.message}`,
			});
		}
	};

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0 w-100">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
									type="email"
									name="email-address"
									id="email-address"
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
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							{this.state.loading ? (
								<Spinner />
							) : (
								<button
									onClick={this.onSubmitSignIn}
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									type="submit"
								>
									Sign in
								</button>
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
