import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition';

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
			imageURL: ''
		}
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value })

	}

	onButtonSubmit = () => {
		this.setState({ imageURL: this.state.input })

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(
				function (response) {
					console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
				},
				function (err) {
					console.log('ERROR');
				}
			);
	}


	render() {
		return (
			<div className="App">
				<Particles className='particles' params={particlesSetting} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageURL={this.state.imageURL} />
			</div>
		);
	}
}

export default App;
