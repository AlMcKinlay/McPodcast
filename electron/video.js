const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const ffmpegStatic = require("ffmpeg-static").replace("app.asar", "app.asar.unpacked");

ffmpeg.setFfmpegPath(ffmpegStatic);

exports.getVideo = (audioPath, image, videoPath, length) => {
	return new Promise((res, rej) => {
		// Create temp album image
		fs.writeFileSync("tmpvideoimagefile.png", image.split(";base64,").pop(), {
			encoding: "base64",
		});
		ffmpeg()
			.addInput(audioPath)
			.addInput("tmpvideoimagefile.png")
			.loop(length)
			.fps(1)
			.audioBitrate("256k")
			.audioCodec("libmp3lame")
			.audioChannels(2)
			.on("end", function () {
				// TODO: Delete the temp image
				res();
			})
			.on("error", function (err) {
				// TODO: Delete the temp image
				rej(err);
			})
			.on("progress", function (progress) {
				// TODO: Send this info to the frontend
				console.log(progress);
				console.log("Processing: " + progress.percent + "% done");
			})
			.save(videoPath);
	});
};
