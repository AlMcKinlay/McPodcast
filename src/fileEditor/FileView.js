import React, { useState } from "react";
import InfoView from "./infoView";
import styled from "styled-components";
import Actions from "./actions";
import LogView from "./LogView";
import tw from "tailwind.macro";

import { msToTime, stripMs } from "../utils";

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

const ChapterPanel = styled.div`
	${tw`overflow-auto max-h-full`};
`;

const Chapters = styled.ul`
	${tw`list-none`};
`;

const ChaptersHeading = styled.h3`
	${tw`p-0`};
`;

const Chapter = styled.li`
	${tw`mt-4`};
`;

const ChapterTitle = styled.h4`
	${tw`text-xl m-0`};
`;

const ChapterTimes = styled.p`
	${tw`text-base m-0`};
`;

export default function FileView({ file: { path } }) {
	const [tags, setTags] = useState(undefined);
	if (tags === undefined) {
		setTags(id3.getTags(path) || {});
		return <div>Loading...</div>;
	}

	return (
		<Wrapper>
			<InfoView info={tags} setInfo={(tags) => setTags(tags)}></InfoView>
			<ChapterPanel>
				<Chapters>
					<ChaptersHeading>Chapters: {tags.chapter?.length || 0}</ChaptersHeading>
					{tags.chapter.map((chapter) => (
						<Chapter key={chapter.tags.title}>
							<ChapterTitle>{chapter.tags.title}</ChapterTitle>
							<ChapterTimes>
								{stripMs(msToTime(chapter.startTimeMs))} - {stripMs(msToTime(chapter.endTimeMs))}
							</ChapterTimes>
						</Chapter>
					))}
				</Chapters>
			</ChapterPanel>

			<RightPanel>
				<LogView></LogView>
				<Actions path={path} setTags={() => id3.setTags(path, tags)} image={tags.image} length={tags.length}></Actions>
			</RightPanel>
		</Wrapper>
	);
}
