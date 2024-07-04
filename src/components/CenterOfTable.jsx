import React from "react";

function CenterOfTable({cardIMG, value}){

    return(
        <div>
            <div style={{backgroundImage : cardIMG}} id={value} className='card'></div>
        </div>
    )
}

export default CenterOfTable