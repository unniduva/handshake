import React from "react";
import ReactDOM from "react-dom";
import App from "./index";

it("renders without crashing", () => {
    const jsdomScrol = window.scrollTo;  // remember the jsdom alert
    window.scrollTo = () => {};
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    window.alert = jsdomScrol;
});
