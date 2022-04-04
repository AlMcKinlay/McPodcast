const NodeID3 = require("node-id3");
const msToTime = require("../src/shared/utils").msToTime;
const timeToMS = require("../src/shared/utils").timeToMS;
const mp3Duration = require("mp3-duration");

const timeout = (prom, time) => Promise.race([prom, new Promise((_r, rej) => setTimeout(rej, time))]);

exports.getTags = async (file) => {
	const tags = NodeID3.read(file) || {};
	delete tags.raw;

	if (tags.image?.imageBuffer) {
		tags.image.base64 = Buffer.from(tags.image.imageBuffer).toString("base64");
	}

	if (tags.length) {
		tags.length = msToTime(tags.length);
	} else {
		try {
			const seconds = await timeout(mp3Duration(file), 5000);
			tags.length = msToTime(seconds * 1000);
		} catch (e) {
			console.log("No time");
		}
	}

	return tags;
};

exports.setTags = (file, tags) => {
	if (tags.length && tags.length.includes(":")) {
		tags.length = timeToMS(tags.length);
	}

	tags.image.imageBuffer = Buffer.from(tags.image.imageBuffer, "base64");
	const success = NodeID3.write(tags, file);
	return success;
};
