'use strict';

import { getRecipes } from './data.js';
import { setupSearch, setupCuisineFilter, filterRecipes, populateCuisineFilter } from './search.js';

const recipesGrid = document.getElementById('menu-recipes-grid');
const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');
const cuisineSelect = document.getElementById('cuisineSelect');

let allRecipes = [];
let currentFilters = {
    searchTerm: '',
    cuisine: 'all'
};

const renderRecipes = (container, recipes) => {
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    const html = recipes.map(recipe => {
        const trimmedName = recipe.RecipeName.length > 15 ? recipe.RecipeName.substring(0, 15) + '...' : recipe.RecipeName;
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
    }).join('');

    container.innerHTML = html;
};

const applyFilters = () => {
    const filtered = filterRecipes(allRecipes, currentFilters);
    renderRecipes(recipesGrid, filtered);
};

const init = async () => {
    allRecipes = await getRecipes();
    await populateCuisineFilter(cuisineSelect);
    applyFilters();

    setupSearch(searchInput, (searchTerm) => {
        currentFilters.searchTerm = searchTerm;
        applyFilters();
    });

    setupCuisineFilter(cuisineSelect, (cuisine) => {
        currentFilters.cuisine = cuisine;
        applyFilters();
    });
};

init();
