import React, { useState } from "react";
const electron = window.require("electron");
const id3 = electron.remote.require("./getID3Tags");
const video = electron.remote.require("./video");

const createVideo = (audioPath) => {
	video.getVideo(audioPath);
};

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);
	if (tags === undefined) {
		setTags(id3.getTags(path));
	}

	if (tags === undefined) {
		return <div>Loading...</div>;
	}

	if (tags === false) {
		return (
			<>
				<div>Oh no, no tags</div>
				<button onClick={() => createVideo(path)}>Export Video</button>
			</>
		);
	}

	return (
		<div>
			<p>Title: {tags.title}</p>
			<p>Artist: {tags.artist}</p>
			<p>Album: {tags.album}</p>
			<p>Chapters: {tags.chapter.length}</p>
			<p>Length: {tags.length}</p>
			<p>Year: {tags.year}</p>
			<p>Genre: {tags.genre}</p>
			<p>Encoded By: {tags.encodedBy}</p>
			<p>Image: {tags.image.mime}</p>

			<button onClick={() => createVideo(path)}>Export Video</button>
		</div>
	);
}
