import React from "react";
import styled from "styled-components";
import ArtworkDropzone from "./ArtworkDropzone";

const Wrapper = styled.div`
	padding: 0.75rem;
`;

export default function Artwork({ image, setImage }) {
	const dropImage = (file) => {
		window.electronAPI.toBuffer(file.path).then((buffer) => setImage(buffer));
	};

	return (
		<Wrapper>
			<ArtworkDropzone current={image} selectFile={dropImage} />
		</Wrapper>
	);
}
