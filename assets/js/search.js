'use strict';

import { getRecipes } from './data.js';

export const filterRecipes = (recipes, { searchTerm, cuisine }) => {
    let filteredRecipes = recipes;

    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.RecipeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (cuisine && cuisine !== 'all') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.Cuisine === cuisine);
    }

    return filteredRecipes;
};

export const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

export const setupSearch = (inputElement, callback) => {
    const debouncedCallback = debounce(callback, 300);
    inputElement.addEventListener('input', (event) => {
        debouncedCallback(event.target.value);
    });
};

export const setupCuisineFilter = (selectElement, callback) => {
    selectElement.addEventListener('change', (event) => {
        callback(event.target.value);
    });
};

export const populateCuisineFilter = async (selectElement) => {
    const recipes = await getRecipes();
    const cuisines = [...new Set(recipes.map(recipe => recipe.Cuisine))];

    selectElement.innerHTML = '<option value="all">All Cuisines</option>';
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.value = cuisine;
        option.textContent = cuisine;
        selectElement.appendChild(option);
    });
};
