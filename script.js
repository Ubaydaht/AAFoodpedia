
const endpoint = "https://mongotest2026.vercel.app/api/foods";
const listFood =async () => {
    const result = fetch(endpoint);
    // console.log(result);
  const awaitedResult = await result;
//   console.log(awaitedResult);
  const convertedResult = await awaitedResult.json();
  console.log(convertedResult);
  convertedResult.data.map((data,i) => {
    show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; border: 2px solid green; background-color:white;">
        <div style="width: 296px; height: 15vh; border-top-left-radius: 15px; border-top-right-radius: 15px;background-color: greenyellow; flex-direction: column;" class="d-flex justify-content-center align-items-center">
    <p>${data.name}</p>
    <span>${data.category}</span>
  </div>
<div class="p-3">
      <span>${data.description}</span>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/si--clock-fill.png" alt="" > 
    <span>${data.preparationTime}</span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/mynaui--chart-bar.png" alt="">
    <span>Difficulty: ${data.difficulty}</span></span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/fluent-mdl2--calories.png" alt="">
    <span>${data.calories}</span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/ion--pricetag-sharp.png" alt="">
  <span>₦${data.price}</span>
</div>
  <div class="d-flex gap-2 pt-2">
    <span class="rounded-pill bg-secondary p-1 px-2 text-light" style= "">${data.region}</span>
    <button class="rounded-pill bg-secondary p-1 px-2 text-light border-none" onclick="displayInfo(${i})"  >More info</button>    
  </div>
</div>
</div>
`;
  });
};

listFood()



const searchProduct = async(e)=>{
    // if (e.key === "Enter"){
    //     console.log("Enter is pressed");
        
    // }

    // find 
const result = fetch(endpoint);
    // console.log(result);
  const awaitedResult = await result;
//   console.log(awaitedResult);
  const convertedResult = await awaitedResult.json();
    const searchInput = e.target.value;
    const searchResults = convertedResult.data.filter((prd)=>prd.name.toLowerCase().includes(searchInput.toLowerCase()));
    // const searchResults = products.filter((prd)=>prd.name.toLowerCase() === searchInput.toLowerCase());
    // const searchResults = products.find((prd)=>prd.name === searchInput);
    console.log(searchResults);
    // const productsDiv = document.getElementById("productsDiv");
    show.innerHTML =""
    for (i=0; i<searchResults.length; i++){
     show.innerHTML += `
        <div style="width: 300px;border-radius: 15px; border: 2px solid green; background-color:white;">
        <div style="width: 296px; height: 15vh; border-top-left-radius: 15px; border-top-right-radius: 15px;background-color: greenyellow; flex-direction: column;" class="d-flex justify-content-center align-items-center">
    <p>${searchResults[i].name}</p>
    <span>${searchResults[i].category}</span>
  </div>
<div class="p-3">
      <span>${searchResults[i].description}</span>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/si--clock-fill.png" alt="" > 
    <span>${searchResults[i].preparationTime}</span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/mynaui--chart-bar.png" alt="">
    <span>Difficulty: ${searchResults[i].difficulty}</span></span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/fluent-mdl2--calories.png" alt="">
    <span>${searchResults[i].calories}</span>
</div>
  <div class="d-flex align-items-center gap-2">
    <img src="icons/ion--pricetag-sharp.png" alt="">
  <span>₦${searchResults[i].price}</span>
</div>
  <div class="d-flex gap-2 pt-2">
    <span class="rounded-pill bg-dark p-1 text-light">${searchResults[i].region}</span>
     <button class="rounded-pill bg-secondary p-1 px-2 text-light border-none" onclick="displayInfo(${i})"  >More info</button>    
  </div>
</div>
</div>
 `;
  };

}


const displayInfo = async(info)=>{
const result = fetch(endpoint);

  const awaitedResult = await result;
//   console.log(awaitedResult);
  const convertedResult = await awaitedResult.json();
  // console.log(convertedResult);
  console.log(convertedResult.data[info]);
  
  allfood.innerText = `${convertedResult.data[info].name}`
  show.innerHTML =""
  show.innerHTML = `
  <div class="d-lg-flex justify-content-center align-items-center p-4 gap-5">
    <div>
         <div class="rounded-5 bg-dark" style="width: 300px; height: 300px;"></div>
    </div>
    <div class="py-2" style="color: white;  font-size: 17px;">
                <p class="fw-medium fs-4" style="width:80%">${convertedResult.data[info].description}</p>
                <p>Price: ₦${convertedResult.data[info].price}</p>
                <p>Serving Size: ${convertedResult.data[info].servingSize}</p>
                <p>Ingredients: ${convertedResult.data[info].ingredients}</p>
                <p>Vegetarian: ${convertedResult.data[info].isVegetarian}</p>
                <p>Spicy: ${convertedResult.data[info].isSpicy}</p>

          </div>
   </div>` 
}