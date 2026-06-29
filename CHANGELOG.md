# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `react` and `react-native` are now declared as `peerDependencies` (wide ranges:
  `react >=16.8.0`, `react-native >=0.61.0`) with `peerDependenciesMeta`.
- Named exports alongside the existing default export:
  `import { Timeline, ITimeline, ITimelineData, TimelineProps } from "react-native-beautiful-timeline"`.
- Full **Props / API** table, TypeScript usage, and an Expo / New Architecture
  compatibility note in the README.
- Accessibility: each card now exposes a combined `accessibilityLabel`; the
  decorative timeline point is hidden from screen readers.
- Real test suite (Jest + `@testing-library/react-native` + `react-test-renderer`)
  covering rendering, props, date formatting, accessibility, and the issue #48
  single-`VirtualizedList` regression.
- GitHub Actions CI (lint + typecheck + format check + test + build on a Node 18/20
  matrix), issue templates, and a pull request template.
- `CHANGELOG.md` and `CONTRIBUTING.md`.

### Changed

- **Build pipeline** migrated from a hand-rolled `cd lib && tsc` to
  [`react-native-builder-bob`](https://github.com/callstack/react-native-builder-bob),
  emitting CommonJS, ES module, and TypeScript declaration targets to `dist/` with
  a proper `exports` / `module` / `react-native` / `types` field map. The bare
  package-name import (`import Timeline from "react-native-beautiful-timeline"`) and
  the default export shape are preserved.
- Inner day cards are now rendered with `map()` instead of a nested `FlatList`,
  removing the `VirtualizedLists should never be nested` warning and the related
  layout glitches.
- Stable `keyExtractor` / keys derived from `date` + `title` instead of the array
  index, improving list recycling and reorder behavior.
- `useWindowDimensions` replaces module-load `Dimensions.get("screen")` captures so
  the timeline reflows on rotation / split-view.
- Tooling modernized: ESLint 9 flat config (replacing the dead `tslint` lint script
  and the legacy `.eslintrc.js`), TypeScript 5, Prettier 3, commitlint 19, husky 9.
- Repository, bugs, and homepage metadata repointed to
  `github.com/kuraydev/react-native-beautiful-timeline`. **npm package name is
  unchanged.**

### Fixed

- **Issue #48** `(NOBRIDGE) ERROR Cannot read property 'bubblingEventTypes' of null` —
  crash on bridgeless / New Architecture runtimes (incl. Expo). Root causes removed:
  the `react-native-androw` native shadow component and the nested `FlatList`.
- **Issue #49** excessive empty space below the timeline on Android — removed the
  `height: ScreenHeight`, the Android `maxHeight: ScreenHeight / 2` cap, and the
  oversized `contentInset.bottom: ScreenHeight * 0.3`; the container now uses `flex: 1`.
- `Card` no longer imports from the `baseUrl`-relative `"lib/models"`; it uses the
  correct relative path so consumer bundlers resolve it.
- The `data`/`timelineStyle` rest props are no longer spread onto the outer
  `FlatList`, preventing unknown-prop leakage onto the list.
- `renderItem` is typed with `ListRenderItem<ITimeline>` (no more `item: any`).

### Removed

- `react-native-androw` runtime dependency (replaced by native `shadow*` / `elevation`).
- `@freakycoder/react-native-helpers` runtime dependency (replaced by
  `useWindowDimensions` + `Platform`).
- Dead/obsolete devDependencies: `tslint` usage, `react-native-typescript-transformer`,
  `npm-post-install`, `prettier-format`, `@types/react-native`,
  `@react-native-community/eslint-config`, `eslint-config-airbnb`.

## [1.0.1] - 2022-09-16

- Last release on the legacy `WrathChaos/react-native-beautiful-timeline` repo.

[Unreleased]: https://github.com/kuraydev/react-native-beautiful-timeline/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/kuraydev/react-native-beautiful-timeline/releases/tag/v1.0.1
