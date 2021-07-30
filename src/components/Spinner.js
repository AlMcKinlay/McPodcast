import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

// Create the keyframes
const rotate = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
	${tw`rounded-full border-solid border-8 border-t-8 border-gray-200 w-full h-full`};
	border-top-color: #3498db;
	animation: ${rotate} 2s linear infinite;

	border-width: calc(${(props) => props.size} / 8);
	height: ${(props) => props.size};
	width: ${(props) => props.size};
`;
