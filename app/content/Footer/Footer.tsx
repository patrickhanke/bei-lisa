import React from 'react';
import { Link } from '@tanstack/react-router';
import { beige, contentContainer, dark, darkgrey, mq, white } from '@/components/styles';
import { footerContainer, footerContentContainer, footerInnerContainer } from './styles';
import { FlexBox } from '@ui';

const Footer: React.FC = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer css={footerContainer}>
            <div css={[contentContainer, {padding: "0 !important", borderTop: "0.6px solid rgba(0, 0, 0, 0.2)"}]}>
                <div css={[footerInnerContainer]}>
                    
                    <div css={[footerContentContainer, {padding: "0 !important"}]}>
                        <img src="/images/bei_lisa_square.png" alt="Logo" css={{ width: "100%", height: "100%" }} />
                    </div>
                <div css={[footerContentContainer, {borderRight: "1px solid rgba(0, 0, 0, 0.2)"}]}>
                        <h4 >Öffnungszeiten</h4>

                        <FlexBox direction="row" align="center" justify="space-between" hasFullWidth>
                            <p css={{fontWeight: "600"}}>Montag</p> 
                            <p>16:00 - 20:00</p>
                        </FlexBox>
                        <FlexBox direction="row" align="center" justify="space-between" hasFullWidth>
                            <p css={{fontWeight: "600"}}>Dienstag</p> 
                            <p>08:30 - 18:30</p>
                        </FlexBox>
                        <FlexBox direction="row" align="center" justify="space-between" hasFullWidth>
                            <p css={{fontWeight: "600"}}>Mittwoch</p>
                            <p> 08:30 - 20:30</p>
                        </FlexBox>
                        <FlexBox direction="row" align="center" justify="space-between" hasFullWidth>
                            <p css={{fontWeight: "600"}}>Donnerstag</p> 
                            <p>08:30 - 18:00</p>
                        </FlexBox>
                        <FlexBox direction="row" align="center" justify="space-between" hasFullWidth>
                            <p css={{fontWeight: "600"}}>Freitag</p> 
                            <p>08:00 - 14:00</p>
                        </FlexBox>
                    </div>
                    <div css={footerContentContainer}>
                        <h4 >Kontakt</h4>
                        <p>
                            bei Lisa. GmbH
                        </p>
                        <p>
                            Andreas-Hofer-Str. 69b
                        </p>
                        <p>
                            79111 Freiburg im Breisgau
                        </p>
                    </div>
                    <div css={[footerContentContainer, {borderRight: "1px solid rgba(0, 0, 0, 0.2)"}]}>
                        <h4 >Inhalte</h4>
                        <Link to="/" onClick={handleClick}>
                            <p css={{ textDecoration: "underline", cursor: "pointer", [":hover"]: { color: beige } }}>
                                Start
                            </p>
                        </Link>
                        <Link to="/impressum" onClick={handleClick}>
                            <p css={{ textDecoration: "underline", cursor: "pointer", [":hover"]: { color: beige } }}>
                                Impressum
                            </p>
                        </Link>
                        <Link to="/datenschutz" onClick={handleClick}>
                            <p css={{ textDecoration: "underline", cursor: "pointer", [":hover"]: { color: beige } }}>
                                Datenschutz
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
            <div css={{ padding: "0.5em 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderTop: "0.6px solid rgba(0, 0, 0, 0.2)" }}>
                <p>Bei Lisa.</p>
                <p css={{ marginLeft: "0.4em" }}> © {new Date().getFullYear()} </p>
            </div>
        </footer>
    );
};

export default Footer;
