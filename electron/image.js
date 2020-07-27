const fs = require("fs");

exports.toBuffer = (file) => {
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap);
};
