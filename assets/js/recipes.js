'use strict';

import { getRecipes } from './data.js';
import { setupSearch, filterRecipes } from './search.js';

const recipesGrid = document.getElementById('recipes-grid');
const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');

const renderRecipes = (container, recipes, limit) => {
    container.innerHTML = '';
    const recipesToRender = limit ? recipes.slice(0, limit) : recipes;

    if (recipesToRender.length === 0) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    const html = recipesToRender.map(recipe => {
        const trimmedName = recipe.RecipeName.length > 15 ? recipe.RecipeName.substring(0, 15) + '...' : recipe.RecipeName;
        if (container === recipesGrid) {
            return `
                <a href="/recipeDetails.html?id=${recipe.RecipeName}" target="__blank__" class="recipe-link" recipe_id="${recipe.RecipeName}">
                    <div class="product-card">
                        <div class="img-box">
                            <img src="${recipe.imgUrl}" alt="product image" class="product-img" width="200px" height="200px" loading="lazy">
                        </div>
                        <div class="product-content">
                            <div class="wrapper">
                                <h3 class="product-name">${trimmedName}</h3>
                                <p class="product-price">
                                    <span class="small">⏱️</span>${recipe.TimeRequired}
                                </p>
                            </div>
                            <p class="product-text">
                                Cuisine: <b>${recipe.Cuisine}</b>
                            </p>
                        </div>
                    </div>
                </a>
            `;
        } else {
            return `
                <li>
                    <a href="/recipeDetails.html?id=${recipe.RecipeName}" target="__blank__" class="cart-item">
                        <div class="img-box">
                            <img src="${recipe.imgUrl}" alt="product image" class="product-imgss" width="50" height="50" loading="lazy">
                        </div>
                        <h5 class="product-name">${trimmedName}</h5>
                    </a>
                </li>
            `;
        }
    }).join('');

    container.innerHTML = html;
};

const init = async () => {
    const recipes = await getRecipes();
    renderRecipes(recipesGrid, recipes, 6);

    setupSearch(searchInput, (searchTerm) => {
        const filtered = filterRecipes(recipes, { searchTerm });
        renderRecipes(recipeContainer, filtered);
    });
};

init();
