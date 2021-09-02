import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Chapter from "../components/Chapter";
import { Button } from "../components/Buttons";

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
		const startTimeMs = chapters.length > 0 ? chapters[chapters.length - 1].endTimeMs : 0;
		newChapters.push({
			elementID: `Ch${newChapters.length + 1}`,
			startTimeMs,
			endTimeMs: startTimeMs + 1000,
			tags: { title: "" },
			newlyCreated: true,
		});
		setChapters(newChapters);
		setEditingChapter(newChapters[newChapters.length - 1].elementID);
	};
	const updateChapter = (index) => (update) => {
		const newChapters = [...chapters];
		newChapters[index] = update;
		delete newChapters[index].newlyCreated;
		setChapters(newChapters);
		setEditingChapter(null);
	};
	const cancelEditing = (index) => () => {
		setEditingChapter(null);
		const chapter = chapters[index];
		if (chapter.newlyCreated) {
			const newChapters = [...chapters];
			newChapters.splice(index);
			setChapters(newChapters);
		}
	};
	return (
		<Wrapper>
			<ChapterList>
				<ChaptersHeading>Chapters:</ChaptersHeading>
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
