var cuisineSelect = document.getElementById('cuisineSelect');
let recipes_grid = document.getElementById('menu-recipes-grid');
const f_p = 'https://raw.githubusercontent.com/prasad-chavan1/sci_proj/main/recipe.json';
const request = new XMLHttpRequest;
request.open('GET', f_p);
request.send();

request.addEventListener('load', function () {

    const main_data = JSON.parse(this.responseText);

    // Function to collect unique cuisine values
    function getUniqueCuisines(main_data) {
        var uniqueCuisines = new Set();
        main_data.forEach(function (recipe) {
            uniqueCuisines.add(recipe.Cuisine);
        });
        return Array.from(uniqueCuisines); // Convert Set to array
    }

    // Get unique cuisine values from the recipe data
    var uniqueCuisines = getUniqueCuisines(main_data);
    uniqueCuisines.forEach(function (cuisine) {
        var option = document.createElement('option');
        option.value = cuisine;
        option.textContent = cuisine;
        cuisineSelect.appendChild(option);
    });

    function filteredRecipeDataShow(cuisineFilter){
        // Use the filter method to filter recipes with "Indian" cuisine
        var cuisineRecipiesArr = main_data.filter(function (recipe) {
            return recipe.Cuisine === cuisineFilter;
        });
        recipes_grid.innerHTML = '';
        for (let i = 0; i < 12; i++) {
            const recipe = cuisineRecipiesArr[i];
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
    
    
                  </div>
    
                </div>
    
              </a>
            `;
    
            recipes_grid.innerHTML += recipe_data;
    
        }
    
        
    }


    // Function to handle cuisine filter change event
    document.getElementById('cuisineSelect').addEventListener('change', function () {
        var cuisineFilter = this.value;
        filteredRecipeDataShow(cuisineFilter)
    });
    filteredRecipeDataShow('Indian');


    
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

