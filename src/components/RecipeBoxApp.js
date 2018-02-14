import React from 'react';
import RecipesList from './RecipesList';
import AddRecipeModal from './AddRecipeModal';
import CreateRecipe from './CreateRecipe';
import Header from './Header';

export default class RecipeBoxApp extends React.Component {
    state = {
        recipes: [],
        openModal: false,
        recipeToEdit: null
    }

    //gets data from local storage(if exists) on mount
    componentDidMount() {
        if(localStorage.getItem('recipes')) {
            this.setState(() => {
                return {
                    recipes: JSON.parse(localStorage.getItem('recipes')) || []
                }
            });            
        }
    }
    //update localstorage on component update
    componentDidUpdate(prevProps, prevState){
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    }

    //saves recipe if failed returns error
    saveRecipe = (recipe) => {
        if(this.state.recipeToEdit) {
            //edit to already existing recipe
            return this.editRecipe(recipe);
        }
        else {
            //save new recipe
            return this.createRecipe(recipe);
        }
    }

    //create new recipe, if failed return error
    createRecipe = (recipe) => {
        if(this.recipeExists(recipe)){
            return 'Recipe with this name already exists!';
        }
        else if(!recipe.name) {
            return 'Please provide proper value for recipe name';
        }
        else if(recipe.ingredients.length === 0) {
            return 'Please add at least 1 ingredient';
        }
        else {
            this.setState((prevState) => {
                return {
                recipes: prevState.recipes.concat([recipe]), 
                openModal: false 
                }});            
        }
    }
    //edit existing recipe if failed return error
    editRecipe = (recipe) => {
        if(!recipe.name) {
            return 'Please provide proper value for recipe name'
        }
        else if(recipe.ingredients.length === 0) {
            return 'Please add at least 1 ingredient';
        }
        else {
            this.setState((prevState) => {
                const editedVal = prevState.recipes.map((val) => {
                    if(val.name === this.state.recipeToEdit.name) {
                        return recipe;
                    }
                    return val;
                });
                console.log('edited value',editedVal)
                return {
                    recipes: [].concat(editedVal),
                    openModal: false,
                    recipeToEdit: null  
                }
            });            
        }
    }
    //returns true if recipe exists, otherwise false
    recipeExists = (recipe) => {
        const recipes = this.state.recipes;
        const exists = recipes.filter((value) => {
            return value.name === recipe.name;
        });
        return exists.length > 0;
    }
    //opens modal window on call
    handleOpenModal = () => {
        this.setState(() => ({ openModal: true }));
        this.hideListDetails();
    }
    //closes modal window on call
    handleCloseModal = () => {
        this.setState(() => {
            return {
                openModal: false,
                recipeToEdit: null  
            }
        });
    }
    //deletes selected recipe
    handleDeleteRecipe = (recipeToDelete) => {
        this.setState((prevState) => {
            this.hideListDetails();
            return {
                recipes: prevState.recipes.filter((recipe) => {
                    return recipeToDelete.name !== recipe.name;
                })
            }
        })
    }
    //deletes all recipes
    handleDeleteAll = () => {
        this.setState(() => {
            return {
                recipes: []
            }
        });
    }
    //opens modal window in edit mode
    handleEditRecipe = (recipeToEdit) => {
        this.setState(() => {
            return {
                openModal: true,
                recipeToEdit: recipeToEdit
            }
        });
    }
    //displays hidden recipe details list(ingredients)
    handleRecipeDetails = (event) => {
        const elId = event.target.innerText; 
        const elTarget = document.getElementById(elId);
        this.hideListDetails(elId);
        elTarget.classList.toggle('list__info--hidden'); 
        elTarget.classList.toggle('list__item--active');
    }

    //if id is provided element with that id won't be hidden
    //all other second elements in list--primary class collection will be hidden
    hideListDetails = (id) => {
        //can't hide list if there is no list to begin with
        if(this.state.recipes.length !== 0) {
            const primaryList = document.getElementsByClassName('list--primary');
            for(let i = 0; i < primaryList.length; i++) {
                const listItems = primaryList[i].children;
                for(let k = 0; k < listItems.length; k++) {
                    if(listItems[k].children[1].id !== id) {
                        listItems[k].children[1].classList.add('list__info--hidden');
                    } 
                }
            }            
        }
    }

    render(){
        return (
            <div className='container'>
            <Header />
                <div className='container__content'>
                    <RecipesList
                        recipes = {this.state.recipes}
                        handleDeleteRecipe = {this.handleDeleteRecipe}
                        handleEditRecipe = {this.handleEditRecipe}
                        handleRecipeDetails = {this.handleRecipeDetails}
                    />
                    <div className='row--flex-right'>
                        <button
                             className='btn btn--primary'
                             onClick={this.handleOpenModal}
                        >
                            New Recipe
                        </button>
                        <button 
                            className='btn btn--warning'
                            disabled={this.state.recipes.length === 0}
                            onClick={this.handleDeleteAll}
                        >
                            Delete All
                        </button>
                    </div>
                 </div>
                 <AddRecipeModal
                    open = {this.state.openModal}
                 >
                    <CreateRecipe
                    saveRecipe = {this.saveRecipe}
                    handleCloseModal = {this.handleCloseModal}
                    recipeToEdit = {this.state.recipeToEdit}
                    />
                 </AddRecipeModal>
            </div>
        );
    }
}