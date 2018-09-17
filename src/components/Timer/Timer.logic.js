const TimerLogic = (function logic() {
	function secondsToTime(secs) {
		let hours = Math.floor(secs / (60 * 60));

		let minutesDivisor = secs % (60 * 60);
		let minutes = Math.floor(minutesDivisor / 60);

		let secondsDivisor = minutesDivisor % 60;
		let seconds = Math.ceil(secondsDivisor);

		const formatted = {
			hour:	formatTime(hours),
			minute: formatTime(minutes),
			second: formatTime(seconds)
		};

		let time = {
			'h': formatted.hour,
			'm': formatted.minute,
			's': formatted.second
		};

		return time;
	}
  
	function formatTime(time) {
		return time <= 9 ? ('0' + time) : time;
	}
  
	return {
		secondsToTime
	};
}());

export default TimerLogic;