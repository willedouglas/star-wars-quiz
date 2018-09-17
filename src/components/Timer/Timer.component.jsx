import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logic from './Timer.logic.js';

class Timer extends Component {
	constructor(props) {
		super(props);

		const { time } = props;

		this.state = { 
			time: {}, 
			seconds: time
		};
		
		this.timer = 0;
		
		this.startTimer = this.startTimer.bind(this);
		this.countDown = this.countDown.bind(this);
	}

	componentDidMount() {
		this.start();
	}

	renew(time) {
		this.timer = 0;
		this.setState({ seconds: time }, () => this.start());
	}

	start() {
		const { seconds } = this.state;

		let timeLeftVar = Logic.secondsToTime(seconds);
		this.setState({ time: timeLeftVar });
		this.startTimer();
	}

	startTimer() {
		if (this.timer === 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	}

	countDown() {
		const { onFinish } = this.props;

		let seconds = this.state.seconds - 1;
		this.setState({
			time: Logic.secondsToTime(seconds),
			seconds: seconds
		});
    
		if (seconds === 0) { 
			clearInterval(this.timer);
			onFinish();
		}
	}

	render() {
		return(
			<h1 className="timer">
				{this.state.time.m}:{this.state.time.s}
			</h1>
		);
	}
}

Timer.defaultProps = {
	time: 90,
	onFinish: () => {}
};

Timer.propTypes = {
	time: PropTypes.number,
	onFinish: PropTypes.func
};

export default Timer;