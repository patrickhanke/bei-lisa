import React from 'react';
import TeamImage from '../components/teamimage'
import {  darkgrey } from './styles';
const TeamCard = ({name, titel, bild }) => {

    return(
        <div css={{height: "auto", display:"flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "1em", alignItems: "center", marginTop: "5em"}}>
            <div css={{width: "15em", height: "20em", zIndex: 2, marginBottom: "6px"}}>
                <TeamImage bild={bild} />
            </div>
            <div css={{background: "transparent", width: "16em", height: "auto", zIndex: 1}}>
                <h5 css={{color: darkgrey, marginLeft: "0"}}>{name}</h5>
                <h6 css={{color: darkgrey, marginLeft: "0"}}>{titel}</h6>
            </div>
        </div>

    )

}
export default TeamCard