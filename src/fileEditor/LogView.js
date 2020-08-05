import React from "react";
import { useStore } from "../store/store";

export default function LogView() {
	const { state } = useStore();

	return (
		<div>
			{state.logs.map((log) => (
				<div key={log.timestamp}>{log.content}</div>
			))}
		</div>
	);
}
