import React from "react";
import tw from "tailwind.macro";
import styled from "styled-components";

const electron = window.require("electron");
const video = electron.remote.require("./video");

const createVideo = (audioPath, image) => {
	video.getVideo(audioPath, image.imageBuffer.toString("base64"));
};

const ButtonWrapper = styled.div`
	${tw`w-full`}
	display: grid;
	justify-items: center;
`;

const Button = styled.button`
	${tw`font-bold py-2 px-4 border rounded w-1/2 self-center mb-3`};
`;

const PrimaryButton = styled(Button)`
	${tw`bg-blue-500 hover:bg-blue-700 text-white border-blue-700`};
`;

const Wrapper = styled.div`
	display: grid;
	align-items: end;
`;

export default function Actions({ path, setTags, image }) {
	return (
		<Wrapper>
			<ButtonWrapper>
				<Button onClick={() => createVideo(path, image)}>Export Video</Button>
			</ButtonWrapper>
			<ButtonWrapper>
				<PrimaryButton onClick={() => setTags()}>Export Tags</PrimaryButton>
			</ButtonWrapper>
		</Wrapper>
	);
}
