import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders"
import * as actionTypes from "../../store/actions"

import { connect } from 'react-redux'

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount() {
    // axios.get('https://bstore-9da42.firebaseio.com/ingredients.json')
    // .then( response => {
    //     this.setState( { ingredients: response.data } );
    // } )
    // .catch( error => {
    //     this.setState( { error: true } );
    // } );
  }

  updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
    .map( igKey => {
      return ingredients[igKey];
    } )
    .reduce( ( sum, el ) => {
      return sum + el;
    }, 0 );
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {

    this.props.history.push({
      pathname: '/checkout',
      state: { ingredients: this.state.ingredients,
        totalPrice: this.props.totalPrice }

      })

    }

    render () {
      const disabledInfo = {
        ...this.props.ings
      };
      for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }
      // {salad: true, meat: false, ...}
      let orderSummary = null

      let burger = this.state.error ? <p>ingredients can not loaded</p> : <Spinner></Spinner>

    if (this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice} />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:  ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:  ingName})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
