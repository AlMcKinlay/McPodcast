import React, { useEffect, useState } from "react";
import InfoView from "./infoView";
import styled from "styled-components";
import Actions from "./actions";
import LogView from "./LogView";
import ChapterPanel from "../components/ChapterPanel";

const electron = window.require("electron");
const id3 = electron.remote.require("./id3");

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	height: 100%;
`;

const RightPanel = styled.div`
	display: grid;
	grid-template-rows: 4fr 1fr;
`;

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);

	useEffect(() => {
		async function getTags() {
			let newTags = await id3.getTags(path);
			console.log(newTags);
			setTags(newTags || {});
		}

		if (tags === undefined) {
			getTags();
		}
	}, [tags, path]);

	return tags ? (
		<Wrapper>
			<InfoView info={tags} setInfo={(tags) => setTags(tags)}></InfoView>
			<ChapterPanel
				chapters={tags.chapter}
				setChapters={(newChapters) => setTags({ ...tags, chapter: newChapters })}
			></ChapterPanel>

			<RightPanel>
				<LogView></LogView>
				<Actions path={path} setTags={() => id3.setTags(path, tags)} image={tags.image} length={tags.length}></Actions>
			</RightPanel>
		</Wrapper>
	) : (
		<div>Loading...</div>
	);
}
