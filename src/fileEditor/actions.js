import React, { useState } from "react";
import tw from "tailwind.macro";
import styled from "styled-components";
import { Button, PrimaryButton } from "../components/Buttons";
import { sideEffect } from "../utils";

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

	const askForSaveLocation = () => {
		return dialog.showSaveDialog();
	};

	const createVideo = (audioPath, image, filePath) => {
		return video.getVideo(audioPath, image.imageBuffer.toString("base64"), filePath);
	};

	const onClickCreate = () => {
		setErr(undefined);
		askForSaveLocation()
			.then(sideEffect(() => setIsCreatingVideo(true)))
			.then(sideEffect(({ canceled }) => console.log(canceled)))
			.then(({ canceled, filePath }) => (canceled ? Promise.reject("canceled") : filePath))
			.then((filePath) => (filePath.includes(".mp4") ? filePath : `${filePath}.mp4`))
			.then((filePath) => createVideo(path, image, filePath))
			.catch((err) => setErr(err)) // TODO: show error message somewhere
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
