import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
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
	const updateChapter = (index) => (update) => {
		console.log(update);
		const newChapters = [...chapters];
		newChapters[index] = update;
		setChapters(newChapters);
		setEditingChapter(null);
	};
	const cancelEditing = (index) => () => {
		setEditingChapter(null);
		const chapter = chapters[index];
		if (chapter.tags.title.trim() === "" && chapter.startTimeMs === 0 && chapter.endTimeMs === 0) {
			const newChapters = [...chapters];
			newChapters.splice(index);
			setChapters(newChapters);
		}
	};
	return (
		<Wrapper>
			<ChapterList>
				<ChaptersHeading>Chapters: {chapters?.length || 0}</ChaptersHeading>
				{chapters?.map((chapter, index) => (
					<Chapter
						chapter={chapter}
						editing={editingChapter === chapter.elementID}
						key={chapter.elementID}
						updateChapter={updateChapter(index)}
						cancelEditing={cancelEditing(index)}
					></Chapter>
				))}

				{editingChapter === null && <Button onClick={addChapter} text="Add Chapter"></Button>}
			</ChapterList>
		</Wrapper>
	);
}
