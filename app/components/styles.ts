import styled from '@emotion/styled';
import facepaint from 'facepaint';

export const white = '#FDFAF7';
export const light = '#F1EFE7';
export const beige = '#2f4858';
export const dark = '#3D3D3D';
export const darkgrey = '#3D3D3D';

const breakpoints = [576, 980, 1180, 1900];

export const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`)
);

export const Wrapper = styled.div(
    mq({
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "inline-block",
        background: white,
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: ["14px", "15px", "16px", "16px"],
        ['p']: { color: "inherit" }
    })
);

export const contentContainer = mq({
    padding: ["0 12px", "0 12px", "0 12px", "0"],
    width: "100%",
    overflow: "visible",
    position: "relative",
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1120px',
    fontSize: ["14px", "15px", "16px", "16px"],
    marginTop: ["24px", "24px", "120px", "180px"],
    marginBottom: ["24px", "24px", "120px", "180px"],
})

interface FlexContainerProps {
    justify?: string;
    background?: string;
    align?: string;
    direction?: string;
}

export const FlexContainer = styled('div', {
    shouldForwardProp: (prop) => !['justify', 'background', 'align', 'direction'].includes(prop as string)
})<FlexContainerProps>(
    {
        width: "100%",
        paddingTop: '2.4em',
        paddingBottom: '2.4em',
        height: 'auto',
        display: "flex",
        overflow: "visible",
        position: "relative",
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1400px',
        fontSize: "18px",
    },
    props => ({ justifyContent: props.justify as any }),
    props => ({ backgroundColor: props.background }),
    props => ({ alignItems: props.align as any }),
    props => ({ flexDirection: props.direction as any })
);

export const FlexContainerMobile = styled.div(
    {
        width: "100%",
        paddingTop: '3em',
        paddingBottom: '.4em',
        paddingLeft: '1.4em',
        paddingRight: '1.4em',
        height: 'auto',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        ["h3"]: { fontSize: "3em", textAlign: "center" }
    },
    mq({
        flexDirection: ['column', 'column', 'column', 'column']
    })
);

export const FlexContainerColumn = styled.div(
    {
        width: "100%",
        paddingTop: '10.4em',
        paddingBottom: '10.4em',
        height: 'auto',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1920px',
    },
    mq({
        paddingRight: ["5%", "5%", "6%", "6%"],
        paddingLeft: ['5%', '5%', '11%', '11%'],
        alignItems: ["flex-start", "flex-start", "flex-start", "flex-start"]
    })
);

interface FlexBoxProps {
    justify?: string;
    align?: string;
    direction?: string;
}

export const FlexBoxMobile = styled.div(
    {
        height: "auto",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
        fontSize: "14px",
        textAlign: "center"
    },
    mq({
        flexDirection: ["column", "column", "column", "column"],
        width: ['100%', '100%', '100%', '100%']
    })
);

export const FlexBoxRow2 = styled.div(
    {
        height: "auto",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
    },
    mq({
        flexDirection: ["row", "row", "row", "row"],
        width: ['100%', '100%', '100%', '100%']
    })
);

export const FlexBoxColumn = styled.div(
    {
        height: "auto",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "visible",
        position: "relative",
    },
    mq({
        width: ['100%', '100%', '45%', '45%'],
        alignItems: ["center", "center", "flex-start", "flex-start"]
    })
);

export const teamcontainer = {
    marginTop: "4em",
    zIndex: 2,
    marginBottom: "6px",
    width: "14em",
    height: "18em",
    overflow: "hidden"
};
