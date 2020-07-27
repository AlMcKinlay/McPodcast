import React, { useState } from "react";
import InfoView from "./infoView";
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
			<InfoView info={tags}></InfoView>
			<p>Chapters: {tags.chapter.length}</p>

			<button onClick={() => createVideo(path)}>Export Video</button>
		</div>
	);
}
