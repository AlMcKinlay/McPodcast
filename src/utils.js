export const sideEffect = (fn) => (d) => {
	fn(d);
	return d;
};
