import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Spinner } from "../components/Spinner";

const ButtonSpinner = styled(Spinner)`
	margin: auto;
`;

const ButtonStyle = styled.button`
	${tw`font-bold py-2 px-4 border rounded self-center mt-3`};
	${(props) => props.err && props.err !== "canceled" && "border: red;"}
`;

const PrimaryButtonStyle = styled(ButtonStyle)`
	${tw`bg-blue-500 hover:bg-blue-700 text-white border-blue-700`};
`;

function ButtonTemplate({ Style, text, onClick, showSpinner, err }) {
	return (
		<Style onClick={onClick} disabled={showSpinner} err={err}>
			{showSpinner ? <ButtonSpinner size={"1.5rem"}></ButtonSpinner> : text}
		</Style>
	);
}

export function Button(props) {
	return <ButtonTemplate Style={ButtonStyle} {...props}></ButtonTemplate>;
}

export function PrimaryButton(props) {
	return <ButtonTemplate Style={PrimaryButtonStyle} {...props}></ButtonTemplate>;
}
