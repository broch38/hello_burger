/**
 * Created by PBR on 18/04/2017.
 */
import React, { Component } from 'react';

class Burger extends Component {
    render(){
        // const burger_id = this.props.burger.id;
        return(
            <div className="burger">
                <div className="burger-name">
                    {this.props.burger.name}
                </div>
                <div className="burger-desc">
                    {this.props.burger.desc}
                </div>
                <div className="burger-price">
                    {this.props.burger.price} €
                </div>
                <AddToCart id={this.props.burger.id} onClick={(burgerState) => this.props.onClick(burgerState)}/>
            </div>
        );
    }
}

class AddToCart extends Component {
    componentWillMount(){
        this.setState({burgerState: {vegan:false,glutenfree:false,double:false,fries:false,coleslaw:false, burger_id:this.props.id}});
    }

    updateBurgerState(attr){
        let currentBurgerState = Object.assign({}, this.state.burgerState);
        if(attr === "fries"){
            currentBurgerState.coleslaw = false;
        }
        if(attr === "coleslaw"){
            currentBurgerState.fries = false;
        }
        currentBurgerState[attr] = !currentBurgerState[attr];
        this.setState({burgerState:currentBurgerState});

    }

    sendBurgerState(){
        let currentBurgerState = Object.assign({}, this.state.burgerState);
       /* let newBurgerState = Object.assign({}, this.state.burgerState);
        newBurgerState.vegan = false;
        newBurgerState.glutenfree = false;
        newBurgerState.double = false;
        newBurgerState.fries = false;
        newBurgerState.coleslaw = false;
        this.setState({burgerState:newBurgerState});*/
        return currentBurgerState;
    }

    render(){
        const infoName = "info_"+this.props.id+"[]";
        const suppName = "supp_"+this.props.id+"[]";
        return (
            <div className="add-to-cart">
                <div className="add-to-cart-container">
                    <label><input type="checkbox" name={infoName} onClick={()=>this.updateBurgerState("vegan")} value="vegan" /><span className="icon-vegan" data-name="Vegan"></span></label>
                    <label><input type="checkbox" name={infoName} onClick={()=>this.updateBurgerState("glutenfree")} value="glutenfree" /><span className="icon-glutenfree" data-name="Sans gluten"></span></label>
                    <label><input type="checkbox" name={infoName} onClick={()=>this.updateBurgerState("double")} value="double" /><span className="icon-double" data-name="Double"></span></label>
                    <label><input type="radio" name={suppName} checked={this.state.burgerState.fries} onClick={()=>this.updateBurgerState("fries")} value="fries" /><span className="icon-fries" data-name="+ Frites"></span></label>
                    <label><input type="radio" name={suppName} checked={this.state.burgerState.coleslaw} onClick={()=>this.updateBurgerState("coleslaw")} value="coleslaw" /><span className="icon-salad" data-name="+ Coleslaw"></span></label>
                </div>
                <button className="btn" onClick={() => this.props.onClick(this.sendBurgerState())}>
                    Ajouter
                </button>
            </div>
        )
    }
}

export {Burger, AddToCart};