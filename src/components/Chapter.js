import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "./Buttons";

const { msToTime, timeToMS, stripMs } = require("../utils");

const Wrapper = styled.li`
	${tw`mt-4 grid grid-flow-row gap-3`};
`;

const ChapterTitle = styled.h4`
	${tw`text-xl m-0`};
`;

const ChapterTimes = styled.div`
	${tw`text-base m-0`};
`;

const ItemWrapper = styled.div``;

const Row = styled.div`
	${tw`grid grid-flow-col auto-rows-max gap-3`};
`;

const Text = styled.input`
	${tw`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`};
`;

export default function Chapter({ chapter, editing, updateChapter, cancelEditing }) {
	const [startTime, setStartTime] = useState(stripMs(msToTime(chapter.startTimeMs)));
	const [endTime, setEndTime] = useState(stripMs(msToTime(chapter.endTimeMs)));
	const [title, setTitle] = useState(chapter.tags.title);
	return (
		<Wrapper key={chapter.elementID}>
			<ChapterTitle>
				{editing ? (
					<ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</ItemWrapper>
				) : (
					chapter.tags.title
				)}
			</ChapterTitle>
			<ChapterTimes>
				{editing ? (
					<Row>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Start Time"
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="End Time"
							value={endTime}
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</Row>
				) : (
					<p>
						{startTime} - {endTime}
					</p>
				)}
			</ChapterTimes>
			{editing && (
				<Row>
					<Button
						onClick={() =>
							updateChapter({
								...chapter,
								startTimeMs: timeToMS(startTime),
								endTimeMs: timeToMS(endTime),
								tags: { ...chapter.tags, title: title },
							})
						}
						text="Save"
					></Button>
					<Button onClick={() => cancelEditing()} text="Cancel"></Button>
				</Row>
			)}
		</Wrapper>
	);
}
