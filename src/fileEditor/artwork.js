import React from "react";
import styled from "styled-components";
import Dropzone from "../components/ArtworkDropzone";

const electron = window.require("electron");
const imageTools = electron.remote.require("./image");

const Wrapper = styled.div`
	padding: 0.75rem;
`;

export default function Artwork({ image, setImage }) {
	return (
		<Wrapper>
			<Dropzone current={image} selectFile={(file) => setImage(imageTools.toBuffer(file.path))}></Dropzone>
		</Wrapper>
	);
}
