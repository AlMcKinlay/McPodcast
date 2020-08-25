export const sideEffect = (fn) => (d) => {
	fn(d);
	return d;
};

export const msToTime = (s) => {
	// Pad to 2 or 3 digits, default is 2
	function pad(n, z) {
		z = z || 2;
		return ("00" + n).slice(-z);
	}

	console.log(s);

	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return `${pad(hrs)}:${pad(mins)}:${pad(secs)}${ms ? `.${pad(ms, 3)}` : ""}`;
};
