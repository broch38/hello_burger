import React, { Component } from 'react';
import {Burger} from './burger-block';
import {Cart} from './cart';
import logo from './logo.svg';
import './App.css';
import './style.css';
import Data from '../public/burgers.json';

class App extends Component {


    componentWillMount(){
        this.setState({burgers: Data});
        this.setState({order: []});
    }

    burgerCompare(burger1, burger2){
        for(let i in burger1){
            if(burger2.hasOwnProperty(i)){
                if(burger1[i] !== burger2[i]){
                    return false;
                }
            }else{
                return false;
            }
        }
        return true;
    }

    addToCart(burgerState){
        let currentBurgerState = Object.assign({},burgerState);
        let currentOrder = this.state.order.slice();
        let nOrder = currentOrder.length;
        let found  = false;
        for(let i=0; i<nOrder; i++){
            if(this.burgerCompare(currentOrder[i].burger, currentBurgerState)){
            //if(currentOrder[i].id === burgerState.burger_id){
                currentOrder[i].qty++;
                found = true;
            }
        }
        if(!found){
            currentOrder.push({id:nOrder+1,burger:currentBurgerState,qty:1});
        }
        this.setState({order:currentOrder});
    }

    removeFromCart(id){
        console.log(id);
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
          <h2>Hello Burgers </h2>
        </div>
          <div className="burger-list">
          {
              this.state.burgers.map((burger) => (<Burger key={burger.id} burger={burger} onClick={(burgerState) => this.addToCart(burgerState)}/>))
          }
          </div>
          <Cart order={this.state.order} burgers={this.state.burgers} removeFct={(id)=> this.removeFromCart(id)} />
          <div className="App-footer">
              &copy;moi-même
          </div>
      </div>
    );
  }
}

export default App;
