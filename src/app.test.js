import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

// Automatic mock, I am telling Jest to mock axios for me.
// When jest does this it will create a dumb copy of axios that
// includes all the methods of axios I neeed.
// the methods of axios I need are "get" and "post. "

jest.mock("./axios");

test("App shows nothing at first", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "ivana",
            last: "maestropaolo",
            profilepicture: "periquito.jpg"
        }
    });
    const { container } = render(<App />);

    expect(
        // this is how we can check if NOTHING has been rendered
        container.children.length
    ).toBe(0);

    await waitForElement(() => container.querySelector("div"));

    expect(container.children.length).toBe(1);
});
