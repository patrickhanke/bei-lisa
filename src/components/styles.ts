import styled from '@emotion/styled';
import { white } from '@styles';
import facepaint from 'facepaint';

const breakpoints = [576, 980, 1180, 1900];



export const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`)
);

export const Wrapper = styled.div(
    {
        scrollbarWidth: "thick !important",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "inline-block",
        background: white,
        marginLeft: "auto",
        marginRight: "auto",
        ['p']: { color: "inherit" }
    },
    [mq({ fontSize: ["14px", "15px", "16px", "16px"] })]
);

interface FlexContainerProps {
    justify?: string;
    background?: string;
    align?: string;
    direction?: string;
}

export const FlexContainer = styled.div<FlexContainerProps>(
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
    props => ({ justifyContent: props.justify }),
    props => ({ backgroundColor: props.background }),
    props => ({ alignItems: props.align }),
    props => ({ flexDirection: props.direction })
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

export const FlexBox = styled.div<FlexBoxProps>(
    {
        height: "auto",
        padding: "1em 0",
        display: "flex",
        overflow: "visible",
        position: "relative",
        minWidth: 0,
    },
    props => ({ justifyContent: props.justify }),
    props => ({ alignItems: props.align }),
    props => ({ flexDirection: props.direction })
);

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
