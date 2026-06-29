import React, { useMemo } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import Card from "../Card/Card";
import PointLine from "../PointLine/PointLine";
import { ITimeline, ITimelineData } from "../../models";
/**
 * ? Local Imports
 */
import { createItemStyles } from "./Item.style";

interface ItemProps {
  style?: StyleProp<ViewStyle>;
  data: ITimeline;
  list: ITimelineData[];
  isLastMember: boolean;
}

const Item: React.FC<ItemProps> = ({
  style,
  data,
  list,
  isLastMember,
  ...rest
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createItemStyles(width), [width]);

  return (
    <View style={[styles.container, style]}>
      <PointLine
        {...rest}
        date={data.date}
        length={list.length}
        isLastMember={isLastMember}
      />
      <View style={styles.insideListContainer}>
        {list.map((item, index) => (
          <Card
            {...rest}
            key={`${item.date}-${item.title}-${index}`}
            isCard
            data={item}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(Item);
