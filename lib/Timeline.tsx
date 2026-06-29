import React, { useCallback, useMemo } from "react";
import {
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { DashProps } from "react-native-dash-2";
import Item from "./components/Item/Item";
import { ITimeline } from "./models";
/**
 * ? Local Imports
 */
import { createTimelineStyles } from "./Timeline.style";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

export interface TimelineProps extends DashProps {
  /**
   * Grouped timeline data. Each entry is a day (`date`) that holds an array of
   * cards (`data`). This shape is the public contract — do not mutate it.
   */
  data: ITimeline[];
  /**
   * Style override applied to the outer `SafeAreaView` container.
   */
  timelineStyle?: CustomStyleProp;
  /**
   * moment-compatible format string for each card's date.
   * @default "DD ddd, HH:mm"
   */
  dateFormat?: string;
  /** Style for the card title text. */
  titleTextStyle?: StyleProp<TextStyle>;
  /** Style for the card subtitle text. */
  subtitleTextStyle?: StyleProp<TextStyle>;
  /** Style for the card date text. */
  dateTextStyle?: StyleProp<TextStyle>;
  /** Style for the day-number label. */
  dayTextStyle?: StyleProp<TextStyle>;
  /** Style for the weekday label. */
  monthTextStyle?: StyleProp<TextStyle>;
  /** Style for the inner timeline point dot. */
  innerContainer?: StyleProp<ViewStyle>;
  /** Style for the outer timeline point ring. */
  outerContainer?: StyleProp<ViewStyle>;
}

const keyForGroup = (item: ITimeline, index: number): string => {
  const firstTitle = item.data?.[0]?.title ?? "";
  return `${item.date}-${firstTitle}-${index}`;
};

const Timeline: React.FC<TimelineProps> = ({
  data,
  timelineStyle,
  ...rest
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createTimelineStyles(width), [width]);

  const renderItem = useCallback<ListRenderItem<ITimeline>>(
    ({ item, index }) => {
      const isLastMember = index === data.length - 1;
      return (
        <Item
          {...rest}
          data={item}
          list={item.data}
          isLastMember={isLastMember}
        />
      );
    },
    [data.length, rest],
  );

  return (
    <SafeAreaView style={[styles.container, timelineStyle]}>
      <FlatList
        data={data}
        style={styles.listStyle}
        contentInset={styles.contentInset}
        keyExtractor={keyForGroup}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default React.memo(Timeline);
