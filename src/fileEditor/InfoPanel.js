import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Artwork from "../components/Artwork";

const timestampFormat = "HH:MM:SS";

const Form = styled.form``;

const Wrapper = styled.div`
	display: grid;
	grid-auto-rows: 1fr 1fr;
	height: 100%;
`;

const ItemWrapper = styled.div``;

const TextWrapper = styled.div`
	align-self: end;
`;

const Text = styled.input`
	${tw`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`};
`;

export default function InfoPanel({ info, setInfo }) {
	useEffect(() => {
		if (!info.encodedBy) {
			setInfo({ ...info, encodedBy: "McPodcast" });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Form>
			<Wrapper>
				<Artwork
					image={info.image}
					setImage={(base64) =>
						setInfo({
							...info,
							image: {
								mime: "jpeg",
								type: { id: 3, name: "front cover" },
								imageBuffer: base64,
							},
						})
					}
				></Artwork>
				<TextWrapper>
					<ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Podcast Title"
							value={info.title || ""}
							onChange={(e) => setInfo({ ...info, title: e.target.value })}
						/>
					</ItemWrapper>
					<ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Podcast"
							value={info.album || ""}
							onChange={(e) => setInfo({ ...info, album: e.target.value })}
						/>
					</ItemWrapper>
					<ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Encoded By"
							value={info.encodedBy || ""}
							onChange={(e) => setInfo({ ...info, encodedBy: e.target.value })}
						/>
					</ItemWrapper>
					<ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Length"
							value={info.length || timestampFormat}
							onChange={(e) => setInfo({ ...info, length: e.target.value })}
						/>
					</ItemWrapper>
					{/* <ItemWrapper>
						<Text
							id="grid-first-name"
							type="text"
							placeholder="Year"
							value={info.year}
						/>
					</ItemWrapper> */}
				</TextWrapper>
			</Wrapper>
		</Form>
	);
}
