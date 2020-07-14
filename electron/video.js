const ffmpeg = require("fluent-ffmpeg");

exports.getVideo = (file) => {
	var proc = ffmpeg()
		.addInput(file)
		.addInput(
			"/home/al/GDrive/Podcasts/ths/Assets/HarvestSeason-Final-Social-01.png"
		)
		.loop(6348)
		.fps(1)
		.audioBitrate("256k")
		.audioCodec("libmp3lame")
		.audioChannels(2)
		.on("end", function () {
			console.log("file has been converted succesfully");
		})
		.on("error", function (err) {
			console.log("an error happened: " + err.message);
		})
		.on("progress", function (progress) {
			console.log("Processing: " + progress.percent + "% done");
		})
		.save("~/test.mp4");
};
