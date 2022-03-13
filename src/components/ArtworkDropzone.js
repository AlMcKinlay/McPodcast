import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const EmptyDropzone = styled.div`
	width: 100%;
	height: 100%;
	padding: 35% 25%;
	border: 2px dashed;
	display: grid;
	justify-items: center;
	align-items: center;
`;

const FullDropzone = styled.div`
	width: 100%;
	height: 100%;

	background: ${(props) => props.background};
	background-size: 100%;
	background-repeat: no-repeat;
`;

const Overlay = styled.div`
	border: ${(props) => props.isDragActive && "2px dashed"};
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	background: ${(props) => props.isDragActive && "rgba(0, 0, 0, 0.7)"};
	color: white;

	padding: 35% 25%;

	display: grid;
	justify-items: center;
	align-items: center;
`;

export default function ArtworkDropzone({ current, selectFile }) {
	const onDrop = useCallback((acceptedFiles) => selectFile(acceptedFiles[0]), [selectFile]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	if (current) {
		return (
			<FullDropzone {...getRootProps()} background={`url(data:image/jpeg;base64,${current.base64})`}>
				<input {...getInputProps()} />
				<Overlay isDragActive={isDragActive}>{isDragActive && "Drop new artwork here"}</Overlay>
			</FullDropzone>
		);
	}

	return (
		<EmptyDropzone {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? "Drop it here ..." : "No Podcast Artwork. Drop one here."}
		</EmptyDropzone>
	);
}
