import React from "react";
import { GridProps, GridItemProps } from "./types";
import { createGridStyles, createGridItemStyles } from "@/content/Footer/styles";

const Grid: React.FC<GridProps> = ({
  children,
  columns = "1fr",
  rows = "auto",
  gap,
  columnGap,
  rowGap,
  alignItems = "stretch",
  justifyItems = "stretch",
  alignContent = "stretch",
  justifyContent = "start",
  autoFlow = "row",
  autoColumns,
  autoRows,
  hasFullWidth = false,
  hasFullHeight = false,
  styles = {},
}) => {
  const gridStyles = createGridStyles({
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    autoFlow,
    autoColumns,
    autoRows,
    hasFullWidth,
    hasFullHeight,
    styles,
  });

  return <div css={gridStyles}>{children}</div>;
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  column,
  row,
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  area,
  alignSelf,
  justifySelf,
  styles = {},
}) => {
  const gridItemStyles = createGridItemStyles({
    column,
    row,
    columnStart,
    columnEnd,
    rowStart,
    rowEnd,
    area,
    alignSelf,
    justifySelf,
    styles,
  });

  return <div css={gridItemStyles}>{children}</div>;
};

export default Grid;
