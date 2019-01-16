import React from 'react'
import PropTypes from 'prop-types'
import Aux from '../../../hoc/Aux'


const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return (
      <li key={igKey}>
      <span style={ {textTransform: 'capitalize'} }>{igKey}: </span> {props.ingredients[igKey]}
      </li>)
  })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A burger ingredients:</p>
      <ul>
      {ingredientSummary}
      </ul>
      <p>Continue Checkout?</p>
    </Aux>
  )
}

export default orderSummary
