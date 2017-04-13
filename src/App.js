import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Data from '../public/burgers.json';

class App extends Component {


    componentWillMount(){
        this.setState({burgers: Data});
        this.setState({order: []});
    }

    addToCart(burgerState){
        let currentOrder = this.state.order.slice();
        let nOrder = currentOrder.length;
        let found  = false;
        for(let i=0; i<nOrder; i++){
            if(currentOrder[i].id === burgerState.burger_id){
                currentOrder[i].qty++;
                found = true;
            }
        }
        if(!found){
            currentOrder.push({id:burgerState.burger_id,burger:burgerState,qty:1});
        }
        this.setState({order:currentOrder});
    }

    removeFromCart(id){
        let currentOrder = this.state.order.slice();
        let nOrder = currentOrder.length;
        for(let i=nOrder-1; i>=0; i--){
            if(currentOrder[i].id === id){
                currentOrder.splice(i,1);
                break;
            }
        }

        this.setState({order:currentOrder});
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <div className="burger-list">
          {
              this.state.burgers.map((burger) => (<Burger key={burger.id} burger={burger} onClick={(burgerState) => this.addToCart(burgerState)}/>))
          }
          </div>
          <Cart order={this.state.order} burgers={this.state.burgers} removeFct={(id)=> this.removeFromCart(id)} />
      </div>
    );
  }
}

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
              {this.props.burger.price}
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
        let currentBurgerState = this.state.burgerState;
        if(attr === "fries"){
            currentBurgerState.coleslaw = false;
        }
        if(attr === "coleslaw"){
            currentBurgerState.fries = false;
        }
        currentBurgerState[attr] = !currentBurgerState[attr];
        this.setState({burgerState:currentBurgerState});
    }

    render(){
        return (
            <div>
                <label><input type="checkbox" name="info[]" onClick={()=>this.updateBurgerState("vegan")} value="vegan" />vegan</label><br/>
                <label><input type="checkbox" name="info[]" onClick={()=>this.updateBurgerState("glutenfree")} value="glutenfree" />sans gluten</label><br/>
                <label><input type="checkbox" name="info[]" onClick={()=>this.updateBurgerState("double")} value="double" />Double</label><br/>
                <label><input type="radio" name="supp[]" onClick={()=>this.updateBurgerState("fries")} value="fries" />+ frites</label><br/>
                <label> <input type="radio" name="supp[]" onClick={()=>this.updateBurgerState("coleslaw")} value="coleslaw" />+ coleslaw</label><br/>
                <button onClick={() => this.props.onClick(this.state.burgerState)}>
                    Ajouter
                </button>
            </div>
        )
    }
}

class Cart extends Component {

    getStateForBurger(id){
        for(let i in this.props.order){
            let orderLine = this.props.order[i];
            if(orderLine.burger.burger_id === id){
                return orderLine.burger;
            }
        }
    }

    getBurgerName(id){
        for(let i in this.props.burgers){
            let burger = this.props.burgers[i];
            if(burger.id === id){

                let currentBurgerState = this.getStateForBurger(id);
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
        }
        return "";
    }

    calculatePrice(id, qty){
        for(let i in this.props.burgers){
            let burger = this.props.burgers[i];
            if(burger.id === id){
                let currentBurgerState = this.getStateForBurger(id);
                let burgerPrice = parseFloat(burger.price);
                if(currentBurgerState.double){
                    burgerPrice += parseFloat(burger.supp_double);
                }
                if(currentBurgerState.fries || currentBurgerState.coleslaw){
                    burgerPrice += 2;
                }
                return burgerPrice * qty;
            }
        }
        return 0;
    }

    render(){
        return (

            <div className="Cart">
                <h2>Cart</h2>
            <ul>
                {
                    this.props.order.map((line) => (<CartItem key={line.id} id={line.id} qty={line.qty} name={this.getBurgerName(line.id)} price={this.calculatePrice(line.id, line.qty)} removeFct={() => this.props.removeFct(line.id)} />))
                }
            </ul>
            </div>
        )
    }
}

class CartItem extends Component {
    render(){
        return (
            <li>{this.props.name} x {this.props.qty} = {this.props.price}€ <button onClick={() => this.props.removeFct()}>X</button></li>
        )
    }
}

export default App;
