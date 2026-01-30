import React from 'react';
import { Link } from '@tanstack/react-router';
import { beige, dark, mq, white } from './styles';

const Footer: React.FC = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            background: dark,
            width: "100%",
            fontSize: "16px"
        }}>
            <div css={mq({ width: "100%", display: "flex", padding: "1em 1em 2em 1em", flexDirection: ["column", "column", "row", "row"], alignItems: ["flex-start", "flex-start", "flex-end", "flex-end"], justifyContent: "space-evenly", color: white, borderBottom: "1px solid " + beige })}>
                <div>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Unsere <br />Öffnungszeiten</h4>
                  <p css={{ color: dark + " !important" }}>Di.: 08:30 - 18:30</p>
                  <p css={{ color: dark + " !important" }}>Mi.: 08:00 - 18:00</p>
                  <p css={{ color: dark + " !important" }}>Do.: 08:30 - 20:00</p>
                  <p css={{ color: dark + " !important" }}>Fr.: 08:00 - 18:00</p>
                </div>
                </div>
                <div>
                    <h5 css={{ marginTop: "2em" }}>Kontakt</h5>
                    <p>
                        Haarstudio Marita Kraus GmbH
                    </p>
                    <p>
                        Andreas-Hofer-Str. 69b
                    </p>
                    <p>
                        79111 Freiburg im Breisgau
                    </p>
                </div>
                <div>
                    <h5 css={{ marginTop: "2em" }}>Inhalte</h5>
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
            <div css={{ background: dark, color: white, padding: "0.5em 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <p>Haarstudio Marita Kraus GmbH</p>
                <p css={{ color: white, marginLeft: "0.4em" }}> © {new Date().getFullYear()} </p>
            </div>
        </footer>
    );
};

export default Footer;
