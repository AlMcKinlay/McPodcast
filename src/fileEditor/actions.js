import React, { useState } from "react";
import tw from "tailwind.macro";
import styled from "styled-components";
import { Button, PrimaryButton } from "../components/Buttons";
import { sideEffect } from "../utils";
import { useStore } from "../store/store";

const electron = window.require("electron");
const video = electron.remote.require("./video");
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

export default function Actions({ path, setTags, image, length }) {
	const [isCreatingVideo, setIsCreatingVideo] = useState(false);
	const [err, setErr] = useState(undefined);
	const { dispatch } = useStore();

	const askForSaveLocation = () => {
		return dialog.showSaveDialog();
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

	const onClickCreate = () => {
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
				<Button
					onClick={onClickCreate}
					disabled={isCreatingVideo}
					err={err}
					showSpinner={isCreatingVideo}
					text="Export Video"
				></Button>
			</ButtonWrapper>
			<ButtonWrapper>
				<PrimaryButton onClick={() => setTags()} text="Export Tags"></PrimaryButton>
			</ButtonWrapper>
		</Wrapper>
	);
}
