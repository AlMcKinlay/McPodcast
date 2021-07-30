const NodeID3 = require("node-id3");
const msToTime = require("../src/utils").msToTime;
const timeToMS = require("../src/utils").timeToMS;

exports.getTags = (file) => {
	const tags = NodeID3.read(file);
	delete tags.raw;

	if (tags.length) {
		tags.length = msToTime(tags.length);
	}
	return tags;
};

exports.setTags = (file, tags) => {
	if (tags.length && tags.length.includes(":")) {
		tags.length = timeToMS(tags.length);
	}
	const success = NodeID3.write(tags, file);
	return success;
};
