const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(".\\ffmpeg");
ffmpeg.setFfprobePath(".\\ffprobe");

exports.getVideo = (file, image) => {
	fs.writeFile(
		"tmpvideoimagefile.png",
		image.split(";base64,").pop(),
		{ encoding: "base64" },
		function (err) {
			console.log("File created");
		}
	);
	var proc = ffmpeg()
		.addInput(file)
		.addInput("tmpvideoimagefile.png")
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
		.save(".\\test.mp4");
};
