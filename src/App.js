import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
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



const initialState = {
	input: '',
	imageUrl: SpacerImg,
	box: {},
	route: 'signin',
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = initialState;
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

		fetch('http://localhost:3000/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }))
						})
						.catch(console.log)
				}
				this.displayFaceBox(this.calculateFaceLocations(response))
			})
			.catch(err => console.log(err));
	}

	onRouteChange = (data) => {
		if (data === 'signin') {
			this.setState(initialState)
		}
		this.setState({ route: data });
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
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
							<Rank name={this.state.user.name} entries={this.state.user.entries} />
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
								<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
								:
								<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
						)
				}
			</div>
		);
	}
}

export default App;