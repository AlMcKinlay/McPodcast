import React from "react";
import tw from "tailwind.macro";
import styled from "styled-components";
import Dropzone from "../components/ArtworkDropzone";

const Wrapper = styled.div`
	padding: 0.75rem;
`;

const PodcastImage = styled.img`
	width: 100%;
`;

export default function Artwork({ image }) {
	return (
		<Wrapper>
			{image ? (
				<PodcastImage
					src={"data:image/jpeg;base64," + image.imageBuffer.toString("base64")}
					alt="Podcast Logo"
				></PodcastImage>
			) : (
				<Dropzone selectFile={() => console.log("Podcast image")}></Dropzone>
			)}
		</Wrapper>
	);
}
