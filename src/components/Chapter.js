import React from "react";
import styled from "styled-components";
import tw from "tailwind.macro";

import { msToTime, stripMs } from "../utils";

const Wrapper = styled.li`
	${tw`mt-4`};
`;

const ChapterTitle = styled.h4`
	${tw`text-xl m-0`};
`;

const ChapterTimes = styled.p`
	${tw`text-base m-0`};
`;

export default function Chapter({ chapter }) {
	return (
		<Wrapper key={chapter.elementID}>
			<ChapterTitle>{chapter.tags.title}</ChapterTitle>
			<ChapterTimes>
				{stripMs(msToTime(chapter.startTimeMs))} - {stripMs(msToTime(chapter.endTimeMs))}
			</ChapterTimes>
		</Wrapper>
	);
}
