    import '../style.css';
    import React from 'react';
    import Buttom from './Buttom';
    


    function Card(){
        return (
        <div className='card'>
            <div className=''>
                <div className='ctitle'>Tarea de paola</div>
                <div className='ccontent'>
                Contenido
                </div>
                <Buttom />
            </div>
        </div>
        )
    }
    export default Card;