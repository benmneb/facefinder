import React from 'react';
import './ImgLinkForm.css';

export default function ImgLinkForm(props) {
	const { inputValue, onInputChange, onButtonSubmit, loading } = props;

	return (
		<div>
			<p className="f3 b">Paste a link to an image below to detect a face.</p>
			<div className="center">
				<div className="Form center pa4 br3 shadow-5">
					<input
						className="f4 pa2 w-70 center"
						type="text"
						value={inputValue}
						onChange={onInputChange}
						placeholder="https://example.com/image.webp"
					/>
					<button
						className={`w-30 f4 ph3 pv2 dib white bg-gray Detect-disabled bn ${
							inputValue &&
							'bg-light-purple hover-bg-purple bg-animate Detect-allowed'
						}`}
						onClick={onButtonSubmit}
						disabled={!inputValue}
					>
						{loading ? 'Detecting...' : 'Detect'}
					</button>
				</div>
			</div>
		</div>
	);
}
