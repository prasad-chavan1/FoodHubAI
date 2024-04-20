let recipes_grid = document.getElementById('recipes-grid');
const f_p = 'https://raw.githubusercontent.com/prasad-chavan1/sci_proj/main/recipe.json';
const request = new XMLHttpRequest;
request.open('GET', f_p);
request.send();

request.addEventListener('load', function () {

    const main_data = JSON.parse(this.responseText);
    console.log(main_data[0]);

    for (let i = 0; i < 6; i++) {
        const recipe = main_data[i];
        const trimmedName = recipe.RecipeName.length > 15 ? recipe.RecipeName.substring(0, 15) + '...' : recipe.RecipeName;
        const recipe_data = `
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
        
        recipes_grid.innerHTML += recipe_data;

    }

  // Function to render recipes based on search query
  function renderRecipes(searchQuery) {
    var recipes_grid = document.getElementById('recipeContainer');
    // var noRecipeMessage = document.getElementById('noRecipeMessage');
    recipes_grid.innerHTML = '';

    var filteredRecipes = main_data.filter(function(recipe) {
      return recipe.RecipeName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filteredRecipes.length === 0) {
      // noRecipeMessage.style.display = 'block';
    } else {
      // noRecipeMessage.style.display = 'none';
      filteredRecipes.forEach(function(recipe) {
        const trimmedName = recipe.RecipeName.length > 15 ? recipe.RecipeName.substring(0, 15) + '...' : recipe.RecipeName;
        const recipe_data = `
        <li>
        <a href="/recipeDetails.html?id=${recipe.RecipeName}" target="__blank__" class="cart-item">
          <div class="img-box">
            <img src="${recipe.imgUrl}" alt="product image" class="product-imgss" width="50" height="50"
              loading="lazy">
          </div>
          <h5 class="product-name">${trimmedName}</h5>
        </a>
      </li>
        `;
        
        recipes_grid.innerHTML += recipe_data;
      });
    }
  }

  // Function to debounce the search input
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Function to handle search input with debounce
  const debouncedSearch = debounce(function(searchQuery) {
    if (searchQuery.trim() !== '') { // Add this condition
      renderRecipes(searchQuery);
    } else {
      renderRecipes(''); // If query is empty, render all recipes
    }
  }, 100);

  // Event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
  var searchQuery = document.getElementById('searchInput').value;
  debouncedSearch(searchQuery);
});

  // Initially render all recipes
  renderRecipes('masala');


});

