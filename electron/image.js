const fs = require("fs");

exports.toBuffer = (file) => {
	var bitmap = fs.readFileSync(file);
	return bitmap.toString("base64");
};
