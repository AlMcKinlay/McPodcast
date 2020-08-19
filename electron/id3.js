const NodeID3 = require("node-id3");

const timestampFormat = "HH:MM:SS";

import { msToTime } from "../src/utils";

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
