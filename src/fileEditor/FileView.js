import React, { useEffect, useState } from "react";
import InfoPanel from "./InfoPanel";
import styled from "styled-components";
import ActionsPanel from "./ActionsPanel";
import LogView from "./LogView";
import ChapterPanel from "./ChapterPanel";
import tw from "twin.macro";

const electron = window.require("electron");
const id3 = electron.remote.require("./id3");

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	height: 100%;
`;

const RightPanel = styled.div`
	display: grid;
	grid-template-rows: 1fr min-content;
	max-height: 100%;
	overflow: auto;
	${tw`mb-3`};
`;

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);

	useEffect(() => {
		async function getTags() {
			let newTags = await id3.getTags(path);
			setTags(newTags || {});
		}

		if (tags === undefined) {
			getTags();
		}
	}, [tags, path]);

	return tags ? (
		<Wrapper>
			<InfoPanel info={tags} setInfo={(tags) => setTags(tags)}></InfoPanel>
			<ChapterPanel chapters={tags.chapter} setChapters={(newChapters) => setTags({ ...tags, chapter: newChapters })} />

			<RightPanel>
				<LogView />
				<ActionsPanel
					path={path}
					setTags={() => id3.setTags(path, tags)}
					image={tags.image}
					length={tags.length}
					chapters={tags.chapter}
				/>
			</RightPanel>
		</Wrapper>
	) : (
		<div>Loading...</div>
	);
}
