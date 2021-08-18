import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useStore } from "../store/store";

const Wrapper = styled.div`
	${tw`overflow-auto max-h-full`};
`;

export default function LogView() {
	const { state } = useStore();

	return (
		<Wrapper>
			{state.logs.map((log) => (
				<div key={log.timestamp}>{log.content}</div>
			))}
		</Wrapper>
	);
}
