import React from 'react';
import IngredientsList from './IngredientsList';

const RecipesList = (props) => {
    return (
        <ul className='list list--primary'>
            {(props.recipes.length > 0)?props.recipes.map((value, index) => {
               return (
                  <li key={index} className='list__item--primary'>
                    <p 
                     onClick={props.handleRecipeDetails}
                     className='list__data'
                    >
                     {value.name} 
                    </p>
                    <div id={value.name} className='list__toggle list__info--hidden'>
                        <IngredientsList
                            ingredients = {value.ingredients}
                        />
                        <button className='btn btn--warning' onClick={(e) => {props.handleDeleteRecipe(value)}}>Delete</button>
                        <button className='btn btn--default' onClick={(e) => {props.handleEditRecipe(value)}}>Edit</button>
                    </div>
                  </li> 
               ) 
            }):(
                <li className='row--flex-center'>
                    <h2>Add your recipes here</h2>
                </li>)}
        </ul>
    )
}

export default RecipesList;