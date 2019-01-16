import React from 'react'
import classes from './BuildControls.module.css'
import PropTypes from 'prop-types'
import BuildControl from "./BuildControl/BuildControl.js"

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"}
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {
      controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          >
        </BuildControl>
      ))
    }
  </div>
);

export default buildControls