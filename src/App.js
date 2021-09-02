import React, { useState } from "react";
import Dropzone from "./components/PodcastDropzone";
import FileView from "./fileEditor/FileView";
import styled from "styled-components";
import { StoreProvider } from "./store/store";
import tw from "twin.macro";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	${tw`p-3`};
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
