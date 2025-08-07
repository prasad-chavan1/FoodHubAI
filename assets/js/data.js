'use strict';

const API_URL = 'https://raw.githubusercontent.com/prasad-chavan1/sci_proj/main/recipe.json';

let recipes = [];

const fetchRecipes = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        recipes = await response.json();
    } catch (error) {
        console.error("Failed to fetch recipes:", error);
    }
};

export const getRecipes = async () => {
    if (recipes.length === 0) {
        await fetchRecipes();
    }
    return recipes;
};
