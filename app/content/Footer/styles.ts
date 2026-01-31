import { light, mq } from "@/components/styles";

export const footerContainer = mq({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "16px",
    borderTop: "0.6px solid " + light,
    marginTop: "80px"
});

export const footerInnerContainer = mq({
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%"
});

export const footerContentContainer = mq({
    flex: 1,
    borderLeft: "1px solid " + light,
    padding: "1em"
});