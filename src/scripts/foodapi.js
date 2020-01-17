fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food); // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text;
                    } else {
                        food.ingredients = "no ingredients listed";
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

    return foodContainer;
};

const addFoodToDom = (foodAsHTML) => {
    let foodList = document.querySelector(".foodList");
    console.log(foodList);
    foodList.appendChild(foodAsHTML);

};