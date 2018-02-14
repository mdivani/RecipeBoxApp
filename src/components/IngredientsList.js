import React from 'react';

const IngredientsList = (props) => {

    return (
        <div className='column-centered col-12'> 
            <ul className='list list--numeric'>
                {props.ingredients.length > 0 && props.ingredients.map((val, index)=>{
                    return (
                        <li
                         key={index}
                         className='list__item--details row--flex-btw'
                        >
                            <p>{(index + 1) + '. ' + val}</p>
                            {props.isEditable && (<button
                                                     className='btn' 
                                                     onClick={(e) => props.handleRemoveIngredient(val)}
                                                  >Remove
                                                  </button>)}
                        </li>
                    );
                })}
            </ul>
        </div>
    ); 
}

export default IngredientsList;
