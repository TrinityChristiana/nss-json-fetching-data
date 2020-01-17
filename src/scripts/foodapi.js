fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food);
            addFoodToDom(foodAsHTML);
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