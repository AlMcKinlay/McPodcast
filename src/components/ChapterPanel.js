import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import Chapter from "./Chapter";
import { Button } from "./Buttons";

const Wrapper = styled.div`
	${tw`overflow-auto max-h-full`};
`;

const ChapterList = styled.ul`
	${tw`list-none`};
`;

const ChaptersHeading = styled.h3`
	${tw`p-0`};
`;

const ButtonWrapper = styled.div`
	${tw`w-full`}
	display: grid;
	justify-items: center;
`;

export default function ChapterPanel({ chapters, setChapters }) {
	const [editingChapter, setEditingChapter] = useState(null);
	const addChapter = () => {
		const newChapters = chapters ? [...chapters] : [];
		newChapters.push({
			elementID: `Ch${newChapters.length}`,
			startTimeMs: 0,
			endTimeMs: 0,
			tags: { title: "" },
		});
		setChapters(newChapters);
		setEditingChapter(newChapters[newChapters.length - 1].elementID);
	};
	return (
		<Wrapper>
			<ChapterList>
				<ChaptersHeading>Chapters: {chapters?.length || 0}</ChaptersHeading>
				{chapters?.map((chapter) => (
					<Chapter chapter={chapter} editing={editingChapter === chapter.elementID} key={chapter.elementID}></Chapter>
				))}

				<Button onClick={addChapter} text="Add Chapter"></Button>
			</ChapterList>
		</Wrapper>
	);
}
