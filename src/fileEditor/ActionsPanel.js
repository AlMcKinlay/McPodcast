import React, { useState } from "react";
import Modal from "react-modal";
import tw from "twin.macro";
import styled from "styled-components";
import { Button, PrimaryButton } from "../components/Buttons";
import { useStore } from "../store/store";

const electron = window.require("electron");
const video = electron.remote.require("./video");
const { sideEffect, msToTime, stripMs } = electron.remote.require("./utils");
const { dialog } = electron.remote;
const timestampFormat = "HH:MM:SS";

const ButtonWrapper = styled.div`
	${tw`w-full`}
	display: grid;
	justify-items: center;
`;

const Wrapper = styled.div`
	display: grid;
	align-items: end;
`;

const timeToS = (time) => {
	if (time === timestampFormat) {
		return undefined;
	}

	const [h, m, s] = time.split(":");

	return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
};

Modal.setAppElement("#root");

export default function ActionsPanel({ path, setTags, image, length, chapters }) {
	const [isCreatingVideo, setIsCreatingVideo] = useState(false);
	const [err, setErr] = useState(undefined);
	const [modalOpen, setModalOpen] = useState(false);
	const { dispatch } = useStore();

	const askForSaveLocation = () => {
		return dialog.showSaveDialog(null, { defaultPath: path.replace(".mp3", ".mp4") });
	};

	const createVideo = (audioPath, image, filePath) => {
		const seconds = timeToS(length);
		if (seconds === undefined) {
			setErr("No length for podcast set");
			dispatch({ type: "ADD_LOG", log: err || "No length for podcast set" });
			return;
		}
		return video.getVideo(audioPath, image.imageBuffer.toString("base64"), filePath, seconds);
	};

	const log = (message) => dispatch({ type: "ADD_LOG", log: message });

	const onClickCreateVideo = () => {
		dispatch({ type: "ADD_LOG", log: "Create video clicked" });
		setErr(undefined);
		askForSaveLocation()
			.then(sideEffect(() => setIsCreatingVideo(true)))
			.then(({ canceled, filePath }) => (canceled ? Promise.reject() : filePath))
			.then(sideEffect(() => log("Creating video")))
			.then((filePath) => (filePath.includes(".mp4") ? filePath : `${filePath}.mp4`))
			.then((filePath) => createVideo(path, image, filePath))
			.then(sideEffect(() => log("Create video finished")))
			.catch((err) => {
				setErr(err);
				if (typeof err === "object" && err !== null) {
					log(err.message);
				} else if (typeof err === "string") {
					log(err);
				} else {
					log("Create video cancelled");
				}
			})
			.finally(() => setIsCreatingVideo(false));
	};

	return (
		<Wrapper>
			<ButtonWrapper>
				<Button onClick={() => setModalOpen(true)} text="Export Chapters"></Button>
				<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Example Modal">
					<h2>Chapters</h2>

					<pre>{chapters?.map((chapter) => `[${stripMs(msToTime(chapter.startTimeMs))}] ${chapter.tags.title}\n`)}</pre>
					<button onClick={() => setModalOpen(false)}>Close</button>
				</Modal>
			</ButtonWrapper>
			<ButtonWrapper>
				<Button
					onClick={onClickCreateVideo}
					disabled={isCreatingVideo}
					err={err}
					showSpinner={isCreatingVideo}
					text="Create Video"
				></Button>
			</ButtonWrapper>
			<ButtonWrapper>
				<PrimaryButton onClick={() => setTags()} text="Save Tags"></PrimaryButton>
			</ButtonWrapper>
		</Wrapper>
	);
}
