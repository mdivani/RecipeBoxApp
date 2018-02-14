import React from 'react';
import IngredientsList from './IngredientsList';

export default class CreateRecipe extends React.Component {

    state = {
        name: this.props.recipeToEdit && this.props.recipeToEdit.name,
        ingredients: (this.props.recipeToEdit && this.props.recipeToEdit.ingredients) || [],
        isEdit: false,
        error: {}
    }

    componentDidMount() {
        this.setState(() => ({isEdit: !!this.props.recipeToEdit}))
    }

    handleRemoveIngredient = (ingredientToRemove) => {
        this.setState((prevState) => {
            return {
                ingredients: prevState.ingredients.filter((ingredient) =>{
                    return ingredientToRemove !== ingredient;
                })
            }
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const ingredient = e.target.elements.recipe.value;
        const error = {};

        this.setState((prevState) => {
            if(prevState.ingredients.includes(ingredient)){
                error.onIngredients = 'This ingredient is already on the list';
                return {
                    error: error
                }
            }
            else if(!ingredient) {
                error.onIngredients = 'invalid input, please enter correct value';
                return {
                    error: error
                }
            }
            else {
                return {
                    ingredients: prevState.ingredients.concat([ingredient]),
                    error: {}
                }                
            }
        })
        e.target.elements.recipe.value = '';
    }

    handleSaveRecipe = () => {
        const name = document.getElementById('recipe-name').value;
        const recipe = {
            name: name,
            ingredients: this.state.ingredients
        }
        const error = {};
        error.onSave = this.props.saveRecipe(recipe);
        if(!!error) {
            this.setState(() => ({
                error
            }));
        }
    }

    render() {
        return (
            <div className='column--centered'>
                <h3 className='modal__header'>{this.state.isEdit?'Edit':'New'} Recipe</h3>
                <div className='row row--flex-center col-12'>
                    <input
                        id='recipe-name'
                        name='recipe-name'
                        type='text' 
                        placeholder='recipe name'
                        defaultValue = {this.state.name || ''}
                        className='modal__input--text modal__input--block col-12'
                     />
                     <p className='error--message'>{this.state.error.onSave}</p>
                </div>
                <div className='row column--centered col-12'>
                    <form className='row--flex-btw col-12' onSubmit={this.handleFormSubmit}>
                        <input className='modal__input--text modal__input--block col-10' name='recipe' type='text' placeholder='Ingredient' />
                        <button className='btn btn--default col-2'>Add</button>
                    </form>
                    <p className='error--message'>{this.state.error.onIngredients}</p>
                    <IngredientsList
                        ingredients = {this.state.ingredients}
                        isEditable = {true}
                        handleRemoveIngredient = {this.handleRemoveIngredient}
                     />
                </div>
                <div className='row row--flex-right col-12'>
                    <input className='btn btn--default' onClick= {this.handleSaveRecipe} type='submit' value='Save' />
                    <button className='btn btn--default' onClick={this.props.handleCloseModal}>Close</button>
                </div>
                <span className='modal__times' onClick={this.props.handleCloseModal}>x</span>
            </div>
        );        
    }
}
