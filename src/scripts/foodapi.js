fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food); // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // Ingredients
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text;
                    } else {
                        food.ingredients = "no ingredients listed";
                    }

                    // Country of origin
                    if (productInfo.product.countries) {
                        food.countryOrigin = productInfo.product.countries;
                    } else {
                        food.countryOrigin = "no country listed";
                    }

                    // Calories per serving
                    if (productInfo.product.nutriments["energy-kcal"]) {
                        food.calories = productInfo.product.nutriments["energy-kcal"];
                    } else {
                        food.calories = "no calories listed";
                    }
                    
                    // Fat per serving
                    if (productInfo.product.nutriments["fat_value"]) {
                        food.fat = productInfo.product.nutriments["fat_value"];
                    } else {
                        food.fat = "no fat listed";
                    }

                    // Sugar per serving
                    if (productInfo.product.nutriments.sugars) {
                        food.sugar = productInfo.product.nutriments.sugars;
                    } else {
                        food.sugar = "no sugar listed";
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food);

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML);
                });
        });
    });






const foodFactory = (food) => {

    let foodContainer = document.createElement("div");
    foodContainer.classList.add("foodItem");

    let foodName = document.createElement("h1");
    foodName.textContent = `${food.name}`;
    foodContainer.appendChild(foodName);

    let foodCategory = document.createElement("p");
    foodCategory.textContent = `${food.category}`;
    foodContainer.appendChild(foodCategory);

    let foodEthnicity = document.createElement("p");
    foodEthnicity.textContent = `${food.ethnicity}`;
    foodContainer.appendChild(foodEthnicity);

    let foodIngredients = document.createElement("p");
    foodIngredients.textContent = `${food.ingredients}`;
    foodContainer.appendChild(foodIngredients);

    let foodCountryOrigin = document.createElement("p");
    foodCountryOrigin.textContent = `${food.countryOrigin}`;
    foodContainer.appendChild(foodCountryOrigin);

    let foodCalories = document.createElement("p");
    foodCalories.textContent = `${food.calories}`;
    foodContainer.appendChild(foodCalories);

    let foodFat = document.createElement("p");
    foodFat.textContent = `${food.fat}`;
    foodContainer.appendChild(foodFat);

    let foodSugar = document.createElement("p");
    foodSugar.textContent = `${food.sugar}`;
    foodContainer.appendChild(foodSugar);
    return foodContainer;
};

const addFoodToDom = (foodAsHTML) => {
    let foodList = document.querySelector(".foodList");
    console.log(foodList);
    foodList.appendChild(foodAsHTML);

};