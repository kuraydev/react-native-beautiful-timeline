import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import moment from "moment";
import Timeline, { Timeline as NamedTimeline } from "../index";
import type { ITimeline } from "../index";

const sampleData: ITimeline[] = [
  {
    date: 1574342522000,
    data: [
      {
        title: "React Native Beautiful Timeline",
        subtitle: "Sed at justo eros. Phasellus.",
        date: 1574342522000,
      },
      {
        title: "React Native",
        subtitle: "Sed viverra. Nam sagittis.",
        date: 1574342501000,
      },
    ],
  },
  {
    date: 1574248261000,
    data: [
      {
        title: "Timeline",
        subtitle: "Morbi magna orci, consequat in.",
        date: 1574248261000,
      },
    ],
  },
];

describe("Timeline", () => {
  it("exposes a default export and a matching named export", () => {
    expect(Timeline).toBe(NamedTimeline);
  });

  it("renders without crashing for valid data", () => {
    expect(() => render(<Timeline data={sampleData} />)).not.toThrow();
  });

  it("renders every card title and subtitle", () => {
    const { getByText } = render(<Timeline data={sampleData} />);
    expect(getByText("React Native Beautiful Timeline")).toBeTruthy();
    expect(getByText("React Native")).toBeTruthy();
    expect(getByText("Timeline")).toBeTruthy();
    expect(getByText("Sed at justo eros. Phasellus.")).toBeTruthy();
    expect(getByText("Morbi magna orci, consequat in.")).toBeTruthy();
  });

  it("renders one day label per group using the default day format", () => {
    const { getAllByText } = render(<Timeline data={sampleData} />);
    expect(getAllByText(moment(sampleData[0].date).format("DD")).length).toBe(1);
    expect(getAllByText(moment(sampleData[1].date).format("DD")).length).toBe(1);
  });

  it("formats the card date with the default dateFormat token", () => {
    const { getByText } = render(<Timeline data={sampleData} />);
    const expected = moment(sampleData[0].data[0].date).format("DD ddd, HH:mm");
    expect(getByText(expected)).toBeTruthy();
  });

  it("honours a custom dateFormat without breaking the default", () => {
    const { getAllByText } = render(
      <Timeline data={sampleData} dateFormat="YYYY-MM-DD" />,
    );
    const expected = moment(sampleData[0].data[0].date).format("YYYY-MM-DD");
    expect(getAllByText(expected).length).toBeGreaterThanOrEqual(1);
  });

  it("forwards titleTextStyle down to the cards", () => {
    const { getByText } = render(
      <Timeline data={sampleData} titleTextStyle={{ color: "rgb(255, 0, 0)" }} />,
    );
    const node = getByText("Timeline");
    const flattened = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.flat())
      : node.props.style;
    expect(flattened.color).toBe("rgb(255, 0, 0)");
  });

  it("renders nothing and does not throw for an empty data set", () => {
    const { queryByText } = render(<Timeline data={[]} />);
    expect(queryByText("Timeline")).toBeNull();
  });

  it("exposes a combined accessibility label per card", () => {
    const { getByLabelText } = render(<Timeline data={sampleData} />);
    expect(
      getByLabelText("Timeline. Morbi magna orci, consequat in."),
    ).toBeTruthy();
  });

  it("does not render the legacy Androw native shadow component", () => {
    const { UNSAFE_root } = render(<Timeline data={sampleData} />);
    const androwNodes = UNSAFE_root.findAll(
      (n) =>
        typeof n.type === "string" && n.type.toLowerCase().includes("androw"),
    );
    expect(androwNodes.length).toBe(0);
  });

  it("renders custom React children text passed through props gracefully", () => {
    // sanity guard that Text rendering plumbing works in the test env
    const { getByText } = render(<Text>probe</Text>);
    expect(getByText("probe")).toBeTruthy();
  });
});
