import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition';
import SpacerImg from './components/spacer.gif';
import SignIn from './components/SignIn';
import Register from './components/Register'

const particlesSetting = {
	particles: {
		number: {
			value: 12,
			density: {
				enable: true,
				value_area: 950
			}
		},
		shape: {
			type: "circle",
			stroke: {
				width: 1,
				color: "#fff"
			}
		}
	}
}

const app = new Clarifai.App({ apiKey: 'd0f26217492e459396fbf9393caf5249' });

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			input: '',
			imageUrl: SpacerImg,
			box: {},
			route: 'signin'
		}
	}

	calculateFaceLocations = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage')
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}

	displayFaceBox = (box) => {
		this.setState({ box: box })
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })

	}

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input })

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocations(response)))
			.catch(err => console.log(err));
	}

	onRouteChange = (data) => {
		this.setState({ route: data });
	}


	render() {
		const { box, imageUrl, route } = this.state;
		return (
			<div className='App'>
				<Particles className='particles' params={particlesSetting} />
				{
					route === 'home'
						?
						<div>
							<div className='spaceBetween header-container'>
								<Logo />
								<Navigation onRouteChange={this.onRouteChange} />
							</div>
							<Rank />
							<ImageLinkForm
								onInputChange={this.onInputChange}
								onButtonSubmit={this.onButtonSubmit} />
							<FaceRecognition
								box={box}
								imageUrl={imageUrl} />
						</div>
						: (
							route === 'signin'
								?
								<SignIn onRouteChange={this.onRouteChange} />
								:
								<Register onRouteChange={this.onRouteChange} />
						)
				}
			</div>
		);
	}
}

export default App;
