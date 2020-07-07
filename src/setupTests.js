// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

window.require = (module) => {
	{
		if (module !== "electron") {
			return require(module);
		} else {
			return {
				remote: {
					require: (electronModule) => require(`../electron/${electronModule}`),
				},
			};
		}
	}
};
