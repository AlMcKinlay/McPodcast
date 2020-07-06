const NodeID3 = require('node-id3');

exports.getTags = (file) => {
    console.log(file);
    const tags = NodeID3.read(file);
    console.log(tags);
    return tags;
}

exports.setTags = (file, tags) => {
    console.log(file);
    console.log(tags);
    const success = NodeID3.write(tags, file);
    return success;
}