import React, { useState } from "react";
import Dropzone from "./components/PodcastDropzone";
import FileView from "./fileEditor/FileView";
import styled from "styled-components";
import { StoreProvider } from "./store/store";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 10px;
`;

function App() {
	const [file, updateFile] = useState(undefined);

	return (
		<StoreProvider>
			<Wrapper className="App">
				{file ? <FileView file={file}></FileView> : <Dropzone selectFile={updateFile}></Dropzone>}
			</Wrapper>
		</StoreProvider>
	);
}

export default App;
