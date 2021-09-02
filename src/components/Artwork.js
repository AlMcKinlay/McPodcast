import React from "react";
import styled from "styled-components";
import ArtworkDropzone from "./ArtworkDropzone";

const electron = window.require("electron");
const imageTools = electron.remote.require("./image");

const Wrapper = styled.div`
	padding: 0.75rem;
`;

export default function Artwork({ image, setImage }) {
	return (
		<Wrapper>
			<ArtworkDropzone current={image} selectFile={(file) => setImage(imageTools.toBuffer(file.path))} />
		</Wrapper>
	);
}
