import React from "react";
import { render } from "@testing-library/react";
import Dropzone from "./Dropzone";

test("renders dropzone text", () => {
	const { getByText } = render(<Dropzone />);
	const linkElement = getByText(
		/Drop an mp3 file, or click here to select one./i
	);
	expect(linkElement).toBeInTheDocument();
});
