//Define um componente, que será utilizado pelo componente principal(Main).
import React from 'react'
import './Button.css'

//Cria um componente sem estado, de acordo com os elementos de entrada ele será renderizado.
export default props => {
    let classes = 'button '
    //Adiciona as propriedades à classe de acordo com a existencia ou não do mesmo.
    classes += props.operation ? 'operation' : ''
    //Verifica se possui a propriedade double.
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''
    
    //Retorna um botão.
    return (
        //
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )
}