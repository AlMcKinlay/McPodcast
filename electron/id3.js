const NodeID3 = require("node-id3");
const msToTime = require("./utils").msToTime;
const timeToMS = require("./utils").timeToMS;
const mp3Duration = require("mp3-duration");

exports.getTags = async (file) => {
	const tags = NodeID3.read(file);
	delete tags.raw;

	if (tags.length) {
		tags.length = msToTime(tags.length);
	} else {
		const seconds = await mp3Duration(file);
		tags.length = msToTime(seconds * 1000);
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
