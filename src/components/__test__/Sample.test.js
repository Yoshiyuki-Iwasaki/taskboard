import { render } from "@testing-library/react";
import React from "react";
import Sample from "../Sample";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

describe("初期表示の確認", () => {
  test("サンプルページ", () => {
    const { asFragment } = render(<Sample />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the correct initial DOM", () => {
    const doc = render(<Sample />);
    const inputElement = doc.getByTestId("input");
    // The input should be blank.
    expect(inputElement.getAttribute("value")).toBe("");
  });
});