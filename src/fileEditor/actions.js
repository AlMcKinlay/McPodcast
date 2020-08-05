import React, { useState } from "react";
import tw from "tailwind.macro";
import styled from "styled-components";
import { Button, PrimaryButton } from "../components/Buttons";
import { sideEffect } from "../utils";
import { useStore } from "../store/store";

const electron = window.require("electron");
const video = electron.remote.require("./video");
const { dialog } = electron.remote;

const ButtonWrapper = styled.div`
	${tw`w-full`}
	display: grid;
	justify-items: center;
`;

const Wrapper = styled.div`
	display: grid;
	align-items: end;
`;

export default function Actions({ path, setTags, image }) {
	const [isCreatingVideo, setIsCreatingVideo] = useState(false);
	const [err, setErr] = useState(undefined);
	const { dispatch } = useStore();

	const askForSaveLocation = () => {
		return dialog.showSaveDialog();
	};

	const createVideo = (audioPath, image, filePath) => {
		return video.getVideo(audioPath, image.imageBuffer.toString("base64"), filePath);
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
				dispatch({ type: "ADD_LOG", log: err || "Create video cancelled" });
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
