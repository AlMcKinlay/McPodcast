import React from "react";
import tw from "tailwind.macro";
import styled from "styled-components";

const electron = window.require("electron");
const video = electron.remote.require("./video");

const createVideo = (audioPath) => {
	video.getVideo(audioPath);
};

const Text = styled.input`
	${tw`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`};
`;

export default function InfoView(path) {
	return (
		<div>
			<button onClick={() => createVideo(path)}>Export Video</button>
		</div>
	);
}
