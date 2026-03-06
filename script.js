const endpoint = "https://mongotest2026.vercel.app/api/foods";
const image = [
  "image/jolloofff2.png",
  "image/egusi.jpg",
  "image/poundedyam.jpg",
  "image/suya.jpg",
  "image/akara.jpg",
  "image/moinmoin.jpg",
  "image/efo.jpg",
  "image/fried.jpg",
  "image/pepprdsoup.jpg",
  "image/amala.jpg",
  "image/boli.jpg",
  "image/ofada.jpg",
  "image/edikang.jpg",
  "image/tuwo.jpg",
  "image/puff.jpg",
  "image/ohasoup.jpg",
  "image/chinchin.jpg",
  "image/afang.jpg",
  "image/nkowbi.jpg",
  "image/ewa.jpg",
  "image/gizdodo.jpg",
  "image/okro.jpg",
  "image/banga.jpg",
  "image/masa.jpg",
  "image/abacha.jpg",
  "image/whitesoup.jpg",
  "image/dodo.jpg",
  "image/miyan.jpg",
  "image/asaro.jpg",
  "image/yamarita.jpg",
];

const listFood = async () => {
  const result = fetch(endpoint);
  // console.log(result);
  const awaitedResult = await result;
  //   console.log(awaitedResult);
  const convertedResult = await awaitedResult.json();

  show.innerHTML = "";

  convertedResult.data.map((data, i) => {
    const foodData = convertedResult.data[i];
    const founded = favorites.some((food) => food.id === foodData.id);

    show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116); ">
      <div class="d-flex align-items-center justify-content-center">
     <img src='${image[i]}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
  </div>

    
    <div class="p-3">
      <p class='fw-medium fs-5'>${data.name}</p>
      <span>${data.description}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${data.preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${data.calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${data.price}</span>
      </div>
      
        <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${i})">See more details</button>

        <button id="favBtn" class="rounded-pill   border border-success py-2 mt-1 text-success border border-none w-100" style='background-color: ${founded ? "rgba(0, 128, 0, 0.267)" : "transparent"}' onclick="addFavorite(event, ${i})">Add to favorites</button>
      
    </div>
  </div>
`;
  });
};

listFood();

const searchProduct = async (e) => {
  const result = fetch(endpoint);

  const awaitedResult = await result;

  const convertedResult = await awaitedResult.json();
  const searchInput = e.target.value;
  const searchResults = convertedResult.data.filter((prd) =>
    prd.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  console.log(searchResults);
  const allfood = document.getElementById("allfood");
  show.innerHTML = "";
  searchResults.forEach((food, i) => {
    const found = convertedResult.data.findIndex((f) => f.id === food.id);
    const founded = favorites.some((fav) => fav.id === food.id);

    allfood.innerText = `${searchInput}`;
    show.innerHTML += `
        <div style="width: 300px;border-radius: 15px;  background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116);">
      <div class="d-flex align-items-center justify-content-center">
     <img src='${image[found]}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
  </div>

    
    <div class="p-3">
      <p class='fw-medium fs-5'>${searchResults[i].name}</p>
      <span>${searchResults[i].description}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${searchResults[i].preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${searchResults[i].calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${searchResults[i].price}</span>
      </div>
      
       <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${found})">See more details</button>
          <button class="rounded-pill border border-success py-2 mt-1 text-success w-100"
            style="background-color: ${founded ? "rgba(0, 128, 0, 0.267)" : "transparent"}"
            onclick="addFavorite(event, ${found})">Add to favorites</button>
      
    </div>
  </div>
 `;
  });
  
};

const filterSpicy = async () => {
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  const spicyCheckbox = document.getElementById("spicy");

  show.innerHTML = "";

  if (spicyCheckbox.checked) {
    const spicyFoods = convertedResult.data.filter(
      (food) => food.isSpicy === true,
    );
    spicyFoods.forEach((data, i) => {
      const found = convertedResult.data.findIndex((f) => f.id === data.id);
      const founded = favorites.some((food) => food.id === data.id);
      show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116); ">
      <div class="d-flex align-items-center justify-content-center">
     <img src='${image[found]}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
  </div>
    <div class="p-3">
      <p class='fw-medium fs-5'>${data.name}</p>
      <span>${data.description}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${data.preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${data.calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${data.price}</span>
      </div>
      <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${found})">See more details</button>
      <button id="favBtn" class="rounded-pill border border-success py-2 mt-1 text-success border border-none w-100" style='background-color: ${founded ? "rgba(0, 128, 0, 0.267)" : "transparent"}' onclick="addFavorite(event, ${found})">Add to favorites</button>
    </div>
  </div>
`;
    });
  } else {
    listFood();
  }
};

document.getElementById("spicy").addEventListener("change", filterSpicy);

const filterVegetarian = async () => {
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  const vegetarianCheckbox = document.getElementById("vege");

  show.innerHTML = "";

  if (vegetarianCheckbox.checked) {
    const vegetarianFoods = convertedResult.data.filter(
      (food) => food.isVegetarian === true,
    );
    vegetarianFoods.forEach((data, i) => {
      const found = convertedResult.data.findIndex((f) => f.id === data.id);
      const founded = favorites.some((food) => food.id === data.id);
      show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116); ">
      <div class="d-flex align-items-center justify-content-center">
     <img src='${image[found]}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
  </div>
    <div class="p-3">
      <p class='fw-medium fs-5'>${data.name}</p>
      <span>${data.description}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${data.preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${data.calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${data.price}</span>
      </div>
      <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${found})">See more details</button>
      <button id="favBtn" class="rounded-pill border border-success py-2 mt-1 text-success border border-none w-100" style='background-color: ${founded ? "rgba(0, 128, 0, 0.267)" : "transparent"}' onclick="addFavorite(event, ${found})">Add to favorites</button>
    </div>
  </div>
`;
    });
  } else {
    listFood();
  }
};

document.getElementById("vege").addEventListener("change", filterVegetarian);

const displayInfo = async (info) => {
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const foodData = convertedResult.data[info];
  modalContent.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">${foodData.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     <div class="modal-body d-flex gap-3">
            <img src="${image[info]}" alt="" srcset="" style='width:200px;'>
            <div>
              <span>${foodData.description}</span>
              <span class='d-block'><b>Ingredients:</b> ${foodData.ingredients}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${foodData.preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/mynaui--chart-bar.png" alt="" srcset="">
        <span><b>Difficulty:</b>${foodData.difficulty}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${foodData.calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${foodData.price}</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span><b>Category:</b> ${foodData.category}</span>
      </div>
      
        <span><b>Serving size:</b> ${foodData.servingSize}</span>
        <span class='d-block'><b>Region:</b> ${foodData.region}</span>
        <div class="d-flex gap-3">
          <span class='d-block'>${foodData.isVegetarian ? "Vegetarian" : ""}</span>
        <span class='d-block'>${foodData.isSpicy ? "Spicy" : ""}</span>
        </div>
   

            </div>
  `;
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
};

// hero text display

const texts = [
  "Explore Nigeria's rich culinary heritage",
  "Nigeria cuisine",
  "World best recipe",
];
const speed = 100;
const erasespeed = 150;
const delay = 500;

let textIndex = 0;
let charIndex = 0;
const element = document.getElementById("typewriter");

function type() {
  if (charIndex < texts[textIndex].length) {
    element.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, speed);
  }
}
type();

// images slide
const images = ["image/puff2.png", "image/jolloofff2.png"];
let index = 0;
const img = document.getElementById("slider");
setInterval(() => {
  index = (index + 1) % images.length;
  img.src = images[index];
}, 1000);

let favorites = JSON.parse(localStorage.getItem("favoritesList")) || [];
let allFoodData = []; // Store full API data

const loadAllFoods = async () => {
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  allFoodData = convertedResult.data;
};
loadAllFoods();

const addFavorite = async (event, info) => {
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  const foodData = convertedResult.data[info];
  const apiIndex = convertedResult.data.findIndex((f) => f.id === foodData.id);
  const founded = favorites.some((food) => food.id === foodData.id);
  if (founded == false) {
    event.target.style.backgroundColor = "rgba(0, 128, 0, 0.37)";
    event.target.innerText = "Added to favorites";
    foodData.image = image[apiIndex];
    favorites.push(foodData);
    localStorage.setItem("favoritesList", JSON.stringify(favorites));
  } else {
    event.target.style.backgroundColor = "transparent";
    const foodToRemove = favorites.find((food) => food.id === foodData.id);
    const index = favorites.indexOf(foodToRemove);
    if (index > -1) {
      favorites.splice(index, 1);
    }
    localStorage.setItem("favoritesList", JSON.stringify(favorites));
  }
};

const showFavorites = async () => {
  const hero = document.getElementById("heroid");
  hero.style.display = "none";
  const allfood = document.getElementById("allfood");
  const result = fetch(endpoint);
  const awaitedResult = await result;
  const convertedResult = await awaitedResult.json();
  show.innerHTML = "";
  allfood.innerText = "Favorites";
  if (favorites.length === 0) {
    show.innerHTML = `<div style="text-align: center; padding: 50px; font-size: 18px; color: #999;">No items added yet</div>`;
    return;
  }
  for (i = 0; i < favorites.length; i++) {
    const apiIndex = convertedResult.data.findIndex(
      (f) => f.id === favorites[i].id,
    );
    const favoriteImage = favorites[i].image || image[apiIndex];
    show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116);">
      <div class="d-flex align-items-center justify-content-center">
     <img src='${favoriteImage}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
  </div>

    <div class="p-3">
      <p class='fw-medium fs-5'>${favorites[i].name}</p>
      <span>${favorites[i].description}</span>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/si--clock-fill.png" alt="">
        <span>${favorites[i].preparationTime}</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <img src="icons/fluent-mdl2--calories.png" alt="">
        <span>${favorites[i].calories} calories</span>
      </div>
      <div class="d-flex align-items-center gap-2 pb-2">
        <img src="icons/ion--pricetag-sharp.png" alt="">
        <span>₦${favorites[i].price}</span>
      </div>
      
        <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${i})">See more details</button>
      
    </div>
  </div>
 `;
  }
};

const navBrand = document.getElementById("navBrand");
navBrand.addEventListener("click", function () {
  const hero = document.getElementById("heroid");
  hero.style.display = "flex";
  show.innerHTML = "";
  const allfood = document.getElementById("allfood");
  allfood.innerText = "All Foods";
  listFood();
});

const displayFoods = async (filtered, filteredCategory) => {
  const result = await fetch(endpoint);
  const convertedResult = await result.json();
  const show = document.getElementById("show");
  show.innerHTML = "";

  filtered.forEach((food, i) => {
    const found = convertedResult.data.findIndex((f) => f.id === food.id);
    const founded = favorites.some((fav) => fav.id === food.id);

    show.innerHTML += `
      <div style="width: 300px; border-radius: 15px; background-color:white; box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.116);">
        <div class="d-flex align-items-center justify-content-center">
          <img src='${image[found]}' style="width: 298px; height:250px; border-top-left-radius: 15px; border-top-right-radius: 15px;"/>
        </div>
        <div class="p-3">
          <p class='fw-medium fs-5'>${food.name}</p>
          <span>${food.description}</span>
          <div class="d-flex align-items-center gap-2">
            <img src="icons/si--clock-fill.png" alt="">
            <span>${food.preparationTime}</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <img src="icons/fluent-mdl2--calories.png" alt="">
            <span>${food.calories} calories</span>
          </div>
          <div class="d-flex align-items-center gap-2 pb-2">
            <img src="icons/ion--pricetag-sharp.png" alt="">
            <span>₦${food.price}</span>
          </div>
          <button class="rounded-pill bg-success py-2 text-light border border-none w-100" onclick="displayInfo(${found})">See more details</button>
          <button class="rounded-pill border border-success py-2 mt-1 text-success w-100"
            style="background-color: ${founded ? "rgba(0, 128, 0, 0.267)" : "transparent"}"
            onclick="addFavorite(event, ${found})">Add to favorites</button>
        </div>
      </div>
    `;
  });
};

const showRegion = async (regionName) => {
  const response = await fetch(endpoint);
  const convertedResult = await response.json();

  const filtered =
    regionName === "All regions"
      ? convertedResult.data
      : convertedResult.data.filter((food) => food.region === regionName);

  console.log(filtered);
  displayFoods(filtered);
};

const showCategory = async (categoryName) => {
  const response = await fetch(endpoint);
  const convertedResult = await response.json();
  console.log("categoryName received:", categoryName);
  console.log("sample food category:", convertedResult.data[0].category);

  const filteredCategory =
    categoryName === "main course"
      ? convertedResult.data
      : convertedResult.data.filter((food) => food.category === categoryName);

  console.log(filteredCategory);
  displayFoods(filteredCategory);
};
