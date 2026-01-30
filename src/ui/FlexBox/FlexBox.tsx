import React from "react";
import styled from "@emotion/styled";
import { mq } from "@/components/styles";

const FlexBox: React.FC<FlexBoxProps> = ({
  children = "",
  direction = "row",
  align = "flex-start",
  justify = "flex-start",
  gap = "0",
  wrap = false,
  changeToColumn = false,
  styles = {},
  hasFullWidth = false,
}) => {
  const StyledFlexBox = styled.div(
    mq({
      height: "auto",
      padding: 0,
      display: "flex",
      overflow: "visible",
      position: "relative",
      minWidth: 0,
      justifyContent: justify,
      alignItems: changeToColumn ? ["flex-start", "flex-start", align] : align,
      flexDirection: changeToColumn
        ? ["column", "column", "row", "row"]
        : direction,
      width: hasFullWidth ? "100%" : "auto",
      gap,
      flexWrap: wrap ? "wrap" : "no-wrap",
      ...styles,
    }),
  );

  return <StyledFlexBox>{children}</StyledFlexBox>;
};

type FlexBoxProps = {
  children: React.ReactNode;
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  wrap?: boolean;
  changeToColumn?: boolean;
  hasFullWidth?: boolean;
  styles?: object;
};

export default FlexBox;
