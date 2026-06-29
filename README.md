<img alt="React Native Beautiful Timeline" src="assets/logo.png" width="1050"/>

[![Fully customizable, beautifully designed Timeline for React Native.](https://img.shields.io/badge/-Fully%20customizable%2C%20beautifully%20designed%20Timeline%20for%20React%20Native.-lightgrey?style=for-the-badge)](https://github.com/kuraydev/react-native-beautiful-timeline)

[![npm version](https://img.shields.io/npm/v/react-native-beautiful-timeline.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-beautiful-timeline)
[![npm downloads](https://img.shields.io/npm/dt/react-native-beautiful-timeline.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-beautiful-timeline)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/types-included-blue.svg?style=for-the-badge)](https://www.typescriptlang.org/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

A fully customizable, data-driven vertical timeline for React Native. Cards are
grouped by day and anchored to a dashed point-line with day/month labels and soft
shadows. Ships with first-class TypeScript types.

<p align="center">
  <img alt="React Native Beautiful Timeline"
        src="assets/Screenshots/example.gif" />
  <img alt="React Native Beautiful Timeline"
        src="assets/Screenshots/example.png" />
</p>

## Installation

```sh
npm install react-native-beautiful-timeline
# or
yarn add react-native-beautiful-timeline
```

### Peer dependencies

You must already have these installed in your app (every React Native project does):

```json
"react": ">=16.8.0",
"react-native": ">=0.61.0"
```

### Bundled dependencies

These are installed automatically with the package — you do **not** need to add
them yourself:

- [`moment`](https://www.npmjs.com/package/moment) — date formatting
- [`react-native-dash-2`](https://www.npmjs.com/package/react-native-dash-2) — the dashed connector line

> Since the `1.x` overhaul, the library no longer depends on `react-native-androw`
> or `@freakycoder/react-native-helpers`. See [Migrating](#migrating) and the
> [CHANGELOG](./CHANGELOG.md).

## Usage

```js
import Timeline from "react-native-beautiful-timeline";
```

Named imports (and the TypeScript types) are also available:

```ts
import {
  Timeline,
  ITimeline,
  ITimelineData,
  TimelineProps,
} from "react-native-beautiful-timeline";
```

### Data format

`data` is an array of **day groups**. Each group has a `date` (epoch ms) and a
`data` array of cards. Each card has a `title`, `subtitle`, and `date` (epoch ms):

```json
[
  {
    "date": 1574342522000,
    "data": [
      {
        "title": "React Native Beautiful Timeline",
        "subtitle": "Sed at justo eros. Phasellus.",
        "date": 1574342522000
      },
      {
        "title": "React Native",
        "subtitle": "Sed viverra. Nam sagittis.",
        "date": 1574342501000
      }
    ]
  },
  {
    "date": 1574248261000,
    "data": [
      {
        "title": "Timeline",
        "subtitle": "Morbi magna orci, consequat in.",
        "date": 1574248261000
      }
    ]
  }
]
```

The **day** label (number + weekday) comes from each top-level object's `date`;
each **card** comes from that object's `data` array.

### Basic usage

```jsx
<Timeline data={data} />
```

### TypeScript

```tsx
import React from "react";
import { Timeline, ITimeline } from "react-native-beautiful-timeline";

const data: ITimeline[] = [
  {
    date: 1574342522000,
    data: [
      {
        title: "React Native Beautiful Timeline",
        subtitle: "Sed at justo eros. Phasellus.",
        date: 1574342522000,
      },
    ],
  },
];

export default function Screen() {
  return <Timeline data={data} dateFormat="DD MMM, HH:mm" />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` *(required)* | `ITimeline[]` | — | Grouped timeline data (see [Data format](#data-format)). |
| `timelineStyle` | `StyleProp<ViewStyle>` | — | Style override for the outer container. |
| `dateFormat` | `string` | `"DD ddd, HH:mm"` | [moment](https://momentjs.com/docs/#/displaying/format/) format string for each card's date. |
| `titleTextStyle` | `StyleProp<TextStyle>` | — | Style for the card title. |
| `subtitleTextStyle` | `StyleProp<TextStyle>` | — | Style for the card subtitle. |
| `dateTextStyle` | `StyleProp<TextStyle>` | — | Style for the card date. |
| `dayTextStyle` | `StyleProp<TextStyle>` | — | Style for the day number label. |
| `monthTextStyle` | `StyleProp<TextStyle>` | — | Style for the weekday label. |
| `innerContainer` | `StyleProp<ViewStyle>` | — | Style for the inner timeline point dot. |
| `outerContainer` | `StyleProp<ViewStyle>` | — | Style for the outer timeline point ring. |
| `dashGap` | `number` | `7` | Forwarded to [`react-native-dash-2`](https://www.npmjs.com/package/react-native-dash-2). |
| `dashColor` | `string` | `"#e3e3e3"` | Connector line color. |
| `dashThickness` | `number` | `1` | Connector line thickness. |
| `dashLength` | `number` | group card count | Forwarded `Dash` length. |

> Any other [`DashProps`](https://www.npmjs.com/package/react-native-dash-2) you
> pass are forwarded to the connector line.

### Customization example

```jsx
<Timeline
  data={data}
  dateFormat="DD MMM, HH:mm"
  titleTextStyle={{ color: "#222", fontSize: 16 }}
  subtitleTextStyle={{ color: "#777" }}
  dayTextStyle={{ color: "#984cf8" }}
  monthTextStyle={{ color: "#bbb" }}
  innerContainer={{ backgroundColor: "#ff5189" }}
  dashColor="#ddd"
  dashThickness={2}
/>
```

## Expo & New Architecture

This is a pure JavaScript/TypeScript component with **no native modules**, so it
works in:

- **Expo** (managed and bare) — no config plugin or prebuild needed.
- The **New Architecture** (Fabric / bridgeless) — the library renders only core
  React Native primitives (`View`, `Text`, `FlatList`) plus the JS-only
  `react-native-dash-2`.

> If you previously hit `(NOBRIDGE) ERROR ... Cannot read property 'bubblingEventTypes' of null`
> on Expo / bridgeless RN, that was caused by the old `react-native-androw`
> dependency and the nested `FlatList`. Both are gone — see issue
> [#48](https://github.com/kuraydev/react-native-beautiful-timeline/issues/48).

## Migrating

From the legacy `1.0.x` line:

- You no longer need to install `react-native-androw` or
  `@freakycoder/react-native-helpers`.
- Android card shadows now use React Native's native `shadow*` / `elevation`
  instead of the `react-native-androw` bitmap renderer; expect a slightly
  different (lighter) Android shadow.
- The public API — default export, prop names, and the `"DD ddd, HH:mm"` default
  `dateFormat` — is unchanged.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Issues and PRs are welcome. CI runs
typecheck, lint, format check, tests, and build on every PR.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Credits

Thank you for this awesome inspiration. Designed by
[Kamil Janus](https://dribbble.com/shots/3934981-Calendar-view-of-concept-financial-app).

## Author

Kuray (FreakyCoder), kurayogun@gmail.com

## License

React Native Beautiful Timeline is available under the MIT license. See the
[LICENSE](./LICENSE) file for more info.
