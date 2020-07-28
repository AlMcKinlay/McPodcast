const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const ffmpegStatic = require("ffmpeg-static-electron");

ffmpeg.setFfmpegPath(ffmpegStatic.path);

exports.getVideo = (audioPath, image, videoPath) => {
	return new Promise((res, rej) => {
		// Create temp album image
		fs.writeFileSync("tmpvideoimagefile.png", image.split(";base64,").pop(), {
			encoding: "base64",
		});
		ffmpeg()
			.addInput(audioPath)
			.addInput("tmpvideoimagefile.png")
			.loop(6348)
			.fps(1)
			.audioBitrate("256k")
			.audioCodec("libmp3lame")
			.audioChannels(2)
			.on("end", function () {
				console.log("Finished");
				// TODO: Delete the temp image
				res();
			})
			.on("error", function (err) {
				console.log(err);
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
