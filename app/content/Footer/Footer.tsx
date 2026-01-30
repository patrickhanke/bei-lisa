import React from 'react';
import { Link } from '@tanstack/react-router';
import { beige, contentContainer, dark, darkgrey, mq, white } from '@/components/styles';
import { footerContainer, footerContentContainer, footerInnerContainer } from './styles';

const Footer: React.FC = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer css={footerContainer}>
            <div css={[contentContainer, {margin: "0 !important"}]}>
                <div css={footerInnerContainer}>
                    <div css={footerContentContainer}>
                        <h4 >Öffnungszeiten</h4>
                        <p css={{ color: dark + " !important" }}>Di.: 08:30 - 18:30</p>
                        <p css={{ color: dark + " !important" }}>Mi.: 08:00 - 18:00</p>
                        <p css={{ color: dark + " !important" }}>Do.: 08:30 - 20:00</p>
                        <p css={{ color: dark + " !important" }}>Fr.: 08:00 - 18:00</p>
                    </div>
                    <div css={footerContentContainer}>
                        <h4 >Kontakt</h4>
                        <p>
                        bei Lisa. GmbH Haarstudio
                        </p>
                        <p>
                            Andreas-Hofer-Str. 69b
                        </p>
                        <p>
                            79111 Freiburg im Breisgau
                        </p>
                    </div>
                    <div css={[footerContentContainer, {borderRight: "1px solid " + darkgrey}]}>
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
            <div css={{ padding: "0.5em 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderTop: "0.6px solid " + darkgrey }}>
                <p>Haarstudio Bei Lisa.</p>
                <p css={{ marginLeft: "0.4em" }}> © {new Date().getFullYear()} </p>
            </div>
        </footer>
    );
};

export default Footer;
