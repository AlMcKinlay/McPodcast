import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Dropzone = styled.div`
	width: 100%;
	height: 100%;
	padding: 35% 25%;
	border: 2px dashed;
	display: grid;
	justify-items: center;
	align-items: center;
`;

export default function PodcastDropzone({ selectFile }) {
	const onDrop = useCallback(
		(acceptedFiles) => {
			console.log(acceptedFiles);
			selectFile(acceptedFiles[0]);
		},
		[selectFile]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Dropzone {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? "Drop it here ..." : "No Podcast Artwork. Drop one here."}
		</Dropzone>
	);
}
