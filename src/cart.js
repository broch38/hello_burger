/**
 * Created by PBR on 18/04/2017.
 */
import React, {Component} from 'react';

class Cart extends Component {

    getStateForBurger(id){

        for(let i in this.props.order){
            if(this.props.order[i].id === id){
                return this.props.order[i].burger;
            }
        }
    }


    getBurger(burgerId){
        for(let i in this.props.burgers){
            let burger = this.props.burgers[i];
            if(burger.id === burgerId){
                return burger;
            }
        }
        return false;
    }

    getBurgerName(id){

        let currentBurgerState = this.getStateForBurger(id);
        let burger = this.getBurger(currentBurgerState.burger_id);

        let burgerName = burger.name;
        if(currentBurgerState.double){
            burgerName = "Double "+burgerName;
        }
        if(currentBurgerState.vegan){
            burgerName += " vegan ";
        }
        if(currentBurgerState.glutenfree){
            burgerName += " sans gluten ";
        }
        if(currentBurgerState.fries){
            burgerName += " + frites";
        }
        if(currentBurgerState.coleslaw){
            burgerName += " + coleslaw";
        }
        return burgerName;

    }

    calculatePrice(id, qty){
        let currentBurgerState = this.getStateForBurger(id);
        let burger = this.getBurger(currentBurgerState.burger_id);

        let burgerPrice = parseFloat(burger.price);
        if(currentBurgerState.double){
            burgerPrice += parseFloat(burger.supp_double);
        }
        if(currentBurgerState.fries || currentBurgerState.coleslaw){
            burgerPrice += 2;
        }
        return burgerPrice * qty;

    }

    render(){
        return (

            <div className="Cart">
                <h2>Commande</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        this.props.order.map((line) => (<CartItem key={line.id} id={line.id} qty={line.qty} name={this.getBurgerName(line.id)} price={this.calculatePrice(line.id, line.qty)} removeFct={() => this.props.removeFct(line.id)} />))
                    }

                    </tbody>
                </table>
            </div>
        )
    }
}

class CartItem extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.qty}</td>
                <td>{this.props.price} €</td>
                <td><button className="btn small" onClick={() => this.props.removeFct()}>X</button></td>
            </tr>
            //<li>{this.props.name} x {this.props.qty} = {this.props.price}€ <button className="btn small" onClick={() => this.props.removeFct()}>X</button></li>
        )
    }
}

export {Cart, CartItem};