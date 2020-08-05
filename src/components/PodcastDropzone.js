import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Dropzone = styled.div`
	width: 100%;
	height: 100%;
	padding: 10px;
	border: 2px dashed;
	display: grid;
	justify-items: center;
	align-items: center;
`;

export default function PodcastDropzone({ selectFile }) {
	const onDrop = useCallback((acceptedFiles) => selectFile(acceptedFiles[0]), [selectFile]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Dropzone {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? "Drop it here ..." : "Drop an mp3 file, or click here to select one."}
		</Dropzone>
	);
}
