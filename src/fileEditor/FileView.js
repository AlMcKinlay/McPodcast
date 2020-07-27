import React, { useState } from "react";
import InfoView from "./infoView";
import styled from "styled-components";
const electron = window.require("electron");
const id3 = electron.remote.require("./getID3Tags");
const video = electron.remote.require("./video");

const createVideo = (audioPath) => {
	video.getVideo(audioPath);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
`;

const Info = styled(InfoView)``;

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
		<Wrapper>
			<Info info={tags}></Info>
			<div>
				<p>Chapters: {tags.chapter.length}</p>

				<button onClick={() => createVideo(path)}>Export Video</button>
			</div>
		</Wrapper>
	);
}
