import React from "react";


function PlayerHand({cardIMG, click, value, cardClass}){


    return(
        <div>
      <div style={{backgroundImage : cardIMG }} id={value} onClick={click} className={cardClass}></div>
        </div>
    )
}

export default PlayerHand