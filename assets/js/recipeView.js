const fp = 'https://raw.githubusercontent.com/prasad-chavan1/sci_proj/main/recipe.json';
const req = new XMLHttpRequest;
req.open('GET', fp);
req.send();
const recipeAbout = document.getElementById('recipeAbout');

req.addEventListener('load', function () {

    const main_data = JSON.parse(this.responseText);
    

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the product ID from the URL query parameter
    const productId = getQueryParam('id');
    // Use the find method to find the "Masala Anda" recipe
    function findRecipeByName(recipeName) {
        for (let i = 0; i < main_data.length; i++) {
          if (main_data[i].RecipeName.toLowerCase() === recipeName.toLowerCase()) {
            return main_data[i]; // Found the recipe, return it
          }
        }
        return null; // Recipe not found
    }
    let recipe = findRecipeByName(productId);

    document.title = `Food Hub - ${recipe.RecipeName}`

    const ingrediantArray = recipe.Ingredients.split(',');


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
          <b>Ingrediants:</b><br><br>
            
          </p>

        </div>
  `;

    // Create an unordered list element
    const ol = document.createElement('ol');

    // Loop through the instructions array and create list items for each instruction
    ingrediantArray.forEach(instruction => {
        // Create a list item element
        const li = document.createElement('li');
        // Set the text content of the list item to the instruction
        li.textContent = instruction;
        // Append the list item to the unordered list
        ol.appendChild(li);
    });
    document.getElementById('section-text').appendChild(ol);

    const instructionArray = recipe.Instructions.split('\n');

    const instruction = document.getElementById('instructions');
    for (i = 0; i < instructionArray.length; i++) {
        const inst = `<div class="service-card">

    <p class="card-number">${i}</p>
    
    <h3 class="card-heading" style="font-weight: lighter; font-size: 20px;">${instructionArray[i].trim()}</h3>
    
    </div>`;
        instruction.innerHTML += inst;
    }

    document.getElementById('recipeDetailGrid').innerHTML = `<!-- Dynamically data is fetched from recipe .js -->
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
                  <h3 class="product-name">Total ingrediants:</h3>
                  <p class="product-price">
                      <span class="small">🍅</span>${ingrediantArray.length}
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
  </a>`;


   
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








{/* <div class="service-card">

<p class="card-number">01</p>

<h3 class="card-heading">Personalized Recipe RecommendationsSay goodbye to recipe browsing fatigue and
    hello to a personalized cooking experience!</h3>

</div> */}

// Cuisine
// :
// "Indian"
// EnglishIngredients
// :
// "salt,amchur (dry mango powder),karela (bitter gourd pavakkai),red chilli powder,gram flour (besan),onion,cumin seeds (jeera),coriander powder,turmeric powder,sunflower oil"
// Ingredient-count
// :
// 10
// Ingredients
// :
// "1 tablespoon Red Chilli powder,3 tablespoon Gram flour (besan),2 teaspoons Cumin seeds (Jeera),1 tablespoon Coriander Powder (Dhania),2 teaspoons Turmeric powder (Haldi),Salt - to taste,1 tablespoon Amchur (Dry Mango Powder),6 Karela (Bitter Gourd/ Pavakkai) - deseeded,Sunflower Oil - as required,1 Onion - thinly sliced"
// Instructions
// :
// "To begin making the Masala Karela Recipe,de-seed the karela and slice.\nDo not remove the skin as the skin has all the nutrients.\nAdd the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.\nRelease the pressure immediately and open the lids.\nKeep aside.Heat oil in a heavy bottomed pan or a kadhai.\nAdd cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.\nStir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.\nCover the pan and simmer Masala Karela stirring occasionally until everything comes together well.\nTurn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family."
// RecipeName
// :
// "Masala Karela Recipe"
// TimeRequired
// :
// 45
// imgUrl
// :
// "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Pooja_Thakur/Karela_Masala_Recipe-4_1600.jpg"
// url
// :
// "https://www.archanaskitchen.com/masala-karela-recipe"