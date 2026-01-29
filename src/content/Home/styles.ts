import { light } from "@styles";
import { css } from "@emotion/react";

export const headerContainer = css({
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: light,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})