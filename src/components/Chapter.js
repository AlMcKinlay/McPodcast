import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Button } from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const electron = window.require("electron");
const { msToTime, timeToMS, stripMs } = electron.remote.require("./utils");

const Wrapper = styled.li`
	${tw`mt-4 grid grid-cols-10 items-center`};
`;

const InfoWrapper = styled.div`
	${tw`col-span-9 grid grid-flow-row gap-1`};
`;

const ChapterTitle = styled.h4`
	${tw`m-0`};
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

const EditButton = styled(FontAwesomeIcon)`
	${tw`cursor-pointer justify-self-end`};
`;

export default function Chapter({ chapter, editing, updateChapter, cancelEditing, setEditing }) {
	const [startTime, setStartTime] = useState(stripMs(msToTime(chapter.startTimeMs)));
	const [endTime, setEndTime] = useState(stripMs(msToTime(chapter.endTimeMs)));
	const [title, setTitle] = useState(chapter.tags.title);
	return (
		<Wrapper key={chapter.elementID}>
			<InfoWrapper>
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
						`${startTime} - ${endTime}`
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
			</InfoWrapper>

			{!editing && <EditButton icon={faEdit} onClick={setEditing} />}
		</Wrapper>
	);
}
