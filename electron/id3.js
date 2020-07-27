const NodeID3 = require("node-id3");

const timestampFormat = "HH:MM:SS";

const msToTime = (s) => {
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

const timeToMS = (time) => {
	if (time === timestampFormat) {
		return undefined;
	}

	const [h, m, s] = time.split(":");

	return (parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s)) * 1000;
};

exports.getTags = (file) => {
	console.log(file);
	const tags = NodeID3.read(file);
	console.log(tags);
	delete tags.raw;

	if (tags.length) {
		tags.length = msToTime(tags.length);
	}
	return tags;
};

exports.setTags = (file, tags) => {
	console.log(file);
	console.log(tags);
	console.log(tags.length);
	console.log(timeToMS(tags.length));
	if (tags.length && tags.length.includes(":")) {
		tags.length = timeToMS(tags.length);
	}
	const success = NodeID3.write(tags, file);
	return success;
};
