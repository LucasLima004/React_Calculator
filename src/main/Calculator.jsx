//Componente da calculadora feito em jsx.
import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


//Define os valores iniciais.
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

//Exporta por padrão extendendo um componente.
export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        //Instancia os elementos para utilização em funções.
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    //Realiza o zeramento da calculadora.
    clearMemory() {
        //Envia o estado para o estado inicial.
        this.setState({ ...initialState })
    }

    //Define o tipo de operação selecionada.
    setOperation(operation) {
        //Altera a posição do array caso ela seja 0.
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const finish = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                //Realiza a operação com os valores do array.
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                //Verifica se o elemento é um NAN.
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values
            })
        }
    }

    //Adiciona o dígito selecionado.
    addDigit(n) {
        //Verifica se já adicionou ponto.
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        //Limpa display em 2 situações, permanecendo 0.
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        //Envia o valor corrente.
        const currentValue = clearDisplay ? '' : this.state.displayValue
        //Adiciona o valor ao display. 
        const displayValue = currentValue + n
        //Altera o estado.
        this.setState({ displayValue, clearDisplay: false })

        //
        if (n !== '.') {
            //Define o índice do array que irá utilizar.
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    //Função que renderiza o elemento.
    render() {
        //Define o retorno
        return (
            //Define uma classe com o nome de calculator.
            //Dentro de cada button possui um elemento que chama a função referente.
            //Cada botão está com sua estilização definida como atributo.
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
                
            </div>
        )
    }
}