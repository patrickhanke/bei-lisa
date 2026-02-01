import { CSSObject } from "@emotion/react";

export type GridProps = {
  children: React.ReactNode;
  columns?: string | string[];
  rows?: string | string[];
  gap?: string | string[];
  columnGap?: string | string[];
  rowGap?: string | string[];
  alignItems?: string | string[];
  justifyItems?: string | string[];
  alignContent?: string | string[];
  justifyContent?: string | string[];
  autoFlow?: string | string[];
  autoColumns?: string | string[];
  autoRows?: string | string[];
  hasFullWidth?: boolean;
  hasFullHeight?: boolean;
  styles?: CSSObject;
};

export type GridItemProps = {
  children: React.ReactNode;
  column?: string | string[];
  row?: string | string[];
  columnStart?: string | number | string[] | number[];
  columnEnd?: string | number | string[] | number[];
  rowStart?: string | number | string[] | number[];
  rowEnd?: string | number | string[] | number[];
  area?: string | string[];
  alignSelf?: string | string[];
  justifySelf?: string | string[];
  styles?: CSSObject;
};
