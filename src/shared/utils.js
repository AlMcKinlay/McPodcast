const timestampFormat = "HH:MM:SS";

const sideEffect = (fn) => (d) => {
	fn(d);
	return d;
};

const msToTime = (s) => {
	// Pad to 2 or 3 digits, default is 2
	function pad(n, z) {
		z = z || 2;
		return ("00" + n).slice(-z);
	}

	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return `${pad(hrs)}:${pad(mins)}:${pad(secs)}${ms ? `.${pad(ms, 3)}` : ""}`;
};

const timeToMS = (time) => {
	if (time === timestampFormat) {
		return undefined;
	}

	const [h, m, s] = time.split(":");

	return (parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s)) * 1000;
};

const stripMs = (time) => {
	return time.split(".")[0];
};

module.exports = {
	sideEffect,
	msToTime,
	stripMs,
	timeToMS,
};
