import React from "react";
import { render } from "@testing-library/react-native";
import moment from "moment";
import Card from "../components/Card/Card";
import type { ITimelineData } from "../models";

const sample: ITimelineData = {
  title: "Hello",
  subtitle: "World",
  date: 1574342522000,
};

describe("Card", () => {
  it("renders title and subtitle", () => {
    const { getByText } = render(<Card data={sample} />);
    expect(getByText("Hello")).toBeTruthy();
    expect(getByText("World")).toBeTruthy();
  });

  it("uses the default date format when none is supplied", () => {
    const { getByText } = render(<Card data={sample} />);
    expect(getByText(moment(sample.date).format("DD ddd, HH:mm"))).toBeTruthy();
  });

  it("applies a custom dateFormat", () => {
    const { getByText } = render(<Card data={sample} dateFormat="HH:mm" />);
    expect(getByText(moment(sample.date).format("HH:mm"))).toBeTruthy();
  });

  it("merges a custom subtitleTextStyle over the default", () => {
    const { getByText } = render(
      <Card data={sample} subtitleTextStyle={{ color: "rgb(1, 2, 3)" }} />,
    );
    const node = getByText("World");
    const flattened = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.flat())
      : node.props.style;
    expect(flattened.color).toBe("rgb(1, 2, 3)");
  });
});
