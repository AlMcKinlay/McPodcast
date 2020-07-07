import React, {useState} from 'react';
import Dropzone from "./components/Dropzone";
import FileView from "./fileEditor/FileView";
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 10px;
`;

function App() {
  const [file, updateFile] = useState(undefined);

  return (
    <Wrapper className="App">
      {file ? <FileView file={file}></FileView> : <Dropzone selectFile={updateFile}></Dropzone>}
    </Wrapper>
  );
}

export default App;
