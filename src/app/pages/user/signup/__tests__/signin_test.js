import React from "react"
import { shallow,mount}from "enzyme"
import {Provider} from "react-redux"
import SignIn from "../index"
import renderer from "react-test-renderer"
import {store} from "../../../../store"
import {BrowserRouter} from "react-router-dom"


it("renders without crashing", () => {
    shallow(<Provider store={store}><BrowserRouter><SignIn /></BrowserRouter></Provider>);
});

it("renders fullDOM without crashing", () => {
    mount(<Provider store={store}><BrowserRouter><SignIn /></BrowserRouter></Provider>);
});

it("renders correctly Dashboard component", () => {
    const Component = renderer.create(<Provider store={store}><BrowserRouter><SignIn /></BrowserRouter></Provider>).toJSON();
    expect(Component).toMatchSnapshot();
});