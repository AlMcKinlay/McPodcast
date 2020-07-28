import tw from "tailwind.macro";
import styled from "styled-components";

export const Button = styled.button`
	${tw`font-bold py-2 px-4 border rounded w-1/2 self-center mb-3`};
	${(props) => props.err && props.err !== "canceled" && "border: red;"}
`;

export const PrimaryButton = styled(Button)`
	${tw`bg-blue-500 hover:bg-blue-700 text-white border-blue-700`};
`;
