import React from "react";


function Buttom({text , color , onClick}){
    return(
        <button className='cbutton' style={{backgroundColor: `${color}`}} onClick={onClick}>{text} </button>

    )
}
export default Buttom;  