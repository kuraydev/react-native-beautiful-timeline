import React from "react";
import { render } from "@testing-library/react-native";
import Timeline from "../index";
import type { ITimeline } from "../index";

const multiCardData: ITimeline[] = [
  {
    date: 1574342522000,
    data: [
      { title: "A", subtitle: "a", date: 1574342522000 },
      { title: "B", subtitle: "b", date: 1574342501000 },
      { title: "C", subtitle: "c", date: 1574342400000 },
    ],
  },
  {
    date: 1574248261000,
    data: [{ title: "D", subtitle: "d", date: 1574248261000 }],
  },
];

const countVirtualizedLists = (
  root: ReturnType<typeof render>["root"],
): number =>
  root.findAll((node) => {
    if (typeof node.type !== "function") {
      return false;
    }
    const component = node.type as { displayName?: string; name?: string };
    return (
      component.displayName === "VirtualizedList" ||
      component.name === "VirtualizedList"
    );
  }).length;

describe("Timeline structure (issue #48 regression)", () => {
  it("uses a single VirtualizedList — inner cards are rendered with map(), not a nested FlatList", () => {
    const { root } = render(<Timeline data={multiCardData} />);
    // The legacy implementation rendered one FlatList per day group inside the
    // outer FlatList, which crashed bridgeless / New Architecture runtimes.
    expect(countVirtualizedLists(root)).toBe(1);
  });

  it("still renders all cards from every group after the map() refactor", () => {
    const { getByText } = render(<Timeline data={multiCardData} />);
    ["A", "B", "C", "D"].forEach((title) => {
      expect(getByText(title)).toBeTruthy();
    });
  });
});
