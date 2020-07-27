import React, { useState } from "react";
import InfoView from "./infoView";
import styled from "styled-components";
import Actions from "./actions";

const electron = window.require("electron");
const id3 = electron.remote.require("./getID3Tags");

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
`;

const Info = styled(InfoView)``;

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);
	if (tags === undefined) {
		setTags(id3.getTags(path) || {});
		return <div>Loading...</div>;
	}

	return (
		<Wrapper>
			<Info info={tags}></Info>
			<div>
				<p>Chapters: {tags.chapter?.length || 0}</p>
			</div>
			<div>
				<Actions path={path}></Actions>
			</div>
		</Wrapper>
	);
}
