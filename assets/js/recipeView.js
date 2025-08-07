'use strict';

import { getRecipes } from './data.js';
import { setupSearch, filterRecipes } from './search.js';

const recipeAbout = document.getElementById('recipeAbout');
const recipeDetailGrid = document.getElementById('recipeDetailGrid');
const instructionsContainer = document.getElementById('instructions');
const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');

const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

const renderRecipeDetails = (recipe) => {
    document.title = `Food Hub - ${recipe.RecipeName}`;

    const ingredients = recipe.Ingredients.split(',');
    const instructions = recipe.Instructions.split('\n');

    recipeAbout.innerHTML = `
        <div class="about-left">
            <div class="img-box">
                <img src="${recipe.imgUrl}" alt="about image" class="about-img" width="250">
            </div>
            <img src="./assets/images/circle.svg" alt="circle shape" class="shape shape-6" width="20">
            <img src="./assets/images/circle.svg" alt="circle shape" class="shape shape-7" width="30">
            <img src="./assets/images/ring.svg" alt="ring shape" class="shape shape-8" width="35">
            <img src="./assets/images/ring.svg" alt="ring shape" class="shape shape-9" width="80">
        </div>
        <div class="about-right">
            <h2 class="section-title">${recipe.RecipeName}</h2>
            <p class="section-text" id="section-text">
                <b>Ingredients:</b><br><br>
                <ol>
                    ${ingredients.map(i => `<li>${i}</li>`).join('')}
                </ol>
            </p>
        </div>
    `;

    instructionsContainer.innerHTML = instructions.map((inst, i) => `
        <div class="service-card">
            <p class="card-number">${i + 1}</p>
            <h3 class="card-heading" style="font-weight: lighter; font-size: 20px;">${inst.trim()}</h3>
        </div>
    `).join('');

    recipeDetailGrid.innerHTML = `
        <a class="recipe-link">
            <div class="product-card">
                <div class="product-content">
                    <div class="wrapper">
                        <h3 class="product-name">Time Required:</h3>
                        <p class="product-price">
                            <span class="small">⏱️</span>${recipe.TimeRequired}
                        </p>
                    </div>
                </div>
            </div>
        </a>
        <a class="recipe-link">
            <div class="product-card">
                <div class="product-content">
                    <div class="wrapper">
                        <h3 class="product-name">Total ingredients:</h3>
                        <p class="product-price">
                            <span class="small">🍅</span>${ingredients.length}
                        </p>
                    </div>
                </div>
            </div>
        </a>
        <a href="${recipe.url}" target="blank" class="recipe-link">
            <div class="product-card">
                <div class="product-content">
                    <div class="wrapper">
                        <h3 class="product-name">Watch Tutorial:</h3>
                        <p class="product-price">
                            <span class="small"></span>🎥
                        </p>
                    </div>
                </div>
            </div>
        </a>
    `;
};

const renderSearchResults = (recipes) => {
    recipeContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipeContainer.innerHTML = '<li>No recipes found.</li>';
        return;
    }

    const html = recipes.map(recipe => {
        const trimmedName = recipe.RecipeName.length > 15 ? recipe.RecipeName.substring(0, 15) + '...' : recipe.RecipeName;
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
    }).join('');

    recipeContainer.innerHTML = html;
};

const init = async () => {
    const recipes = await getRecipes();
    const recipeId = getQueryParam('id');

    if (recipeId) {
        const recipe = recipes.find(r => r.RecipeName.toLowerCase() === recipeId.toLowerCase());
        if (recipe) {
            renderRecipeDetails(recipe);
        } else {
            recipeAbout.innerHTML = '<p>Recipe not found.</p>';
        }
    }

    setupSearch(searchInput, (searchTerm) => {
        const filtered = filterRecipes(recipes, { searchTerm });
        renderSearchResults(filtered);
    });
};

init();
