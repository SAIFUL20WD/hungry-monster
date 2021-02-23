const notFound = () => {
    const noResult = document.getElementById("no-result");
    noResult.innerHTML = `
        <h3>No Result Found With That Name. Please Try Again With Another Food Name</h3>
    `;
    document.getElementById("food-container").innerHTML = "";
    document.getElementById("search-input").value = "";
    document.getElementById("food-recipe").innerHTML = "";
}

const getSearchedFoodDetail = () => {
    const searchInput = document.getElementById("search-input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        if(data.meals){
            displaySearchedFood(data.meals);
        }
        else{
            notFound();
        }
    })
}


const displaySearchedFood = (food) => {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = ""
    document.getElementById("search-input").value = "";
    document.getElementById("food-recipe").innerHTML = "";
    document.getElementById("no-result").innerHTML = "";
    food.forEach(foodItem => {
        const foodDiv = document.createElement("div");
        foodDiv.className = "food";
        const foodInfo = `
            <img src="${foodItem.strMealThumb}">
            <h3>${foodItem.strMeal}</h3>
        `;
        foodDiv.innerHTML = foodInfo;
        foodContainer.appendChild(foodDiv);
        foodDiv.addEventListener("click", (event) => {
        const foodName = event.target.parentNode.childNodes[3].innerText;
        getClickedFoodDetail(foodName)
        })
    })
}


const getClickedFoodDetail = foodName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => {
        const FoodRecipeDetail = data.meals[0];
        displayFoodRecipe(FoodRecipeDetail)
    })
}


const displayFoodRecipe = (recipe) => {
    const recipeDiv = document.getElementById("food-recipe");
    const recipeDetail = `
        <img src="${recipe.strMealThumb}">
        <h2>${recipe.strMeal}</h2>
        <h4>Ingredients:</h4>
        <ol id="ingredients"></ol>
    `;
    recipeDiv.innerHTML = recipeDetail;

    const ol = document.getElementById("ingredients");
    const ingredients = [];
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
        } 
        else {
            // Stop if there are no more ingredients
            break;
        }
    }

    const ingredientList = `${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}`;
    ol.innerHTML = ingredientList;     
    
    window.scrollTo(200, 200);         
}