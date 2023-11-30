const searchcategory = document.getElementById('search');
let userInput = '';

searchcategory.addEventListener('input', (event) => {
  userInput = event.target.value;
  console.log(userInput);
  
});

searchcategory.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    userInput = event.target.value;
    getData();
  }
});
function reloadit(){
    window.location.reload();
}
// console.log(userInput)
function getData(){
    axios
        .get(
            'https://www.themealdb.com/api/json/v1/1/random.php'
        )
        .then((res) => {
            console.log(res.data);
            const category = res.data.meals[0].strCategory
            const dishname = res.data.meals[0].strMeal
            const dishimage = res.data.meals[0].strMealThumb
            const instruction = res.data.meals[0].strInstructions
            
            const randish = `
            <div id='textrandom'
            ">RANDOM MEAL</div>
            <div id="randish">
            
            <img style="padding: 20px;border-radius: 30px" class="randomimage" src="${dishimage}"/>

            <h2>${dishname}</h2>
            <h3>Category:${category}</h3>
            
            <button style='background-color: rgba(255, 255, 255, 0); cursor: pointer; margin-bottom: 20px;' onclick="reloadit()">CHANGE DISH</button>

            <div class="w3-container">
            <button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">Show Ingredients</button>
            <button onclick="document.getElementById('id02').style.display='block'" class="w3-button w3-black">Show Instructions</button>

            <div id="id01" class="w3-modal">
            <div class="w3-modal-content">
            <div class="w3-container">
            <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
            <div id='ingredient'></div>
            </div>
            </div>
            </div>
            <div id="id02" class="w3-modal">
            <div class="w3-modal-content">
            <div class="w3-container">
            <span onclick="document.getElementById('id02').style.display='none'" class="w3-button w3-display-topright">&times;</span>
            <div id='instruction'>Instructions</div>
            </div>
            </div>
            </div>
            </div>
            </div>
            `
            const showdata = document.getElementById('random');
            showdata.innerHTML = randish
            const instr = document.getElementById('instruction');
            instr.innerHTML = instruction
            const ingred = document.getElementById('ingredient');
            const ingredient = (()=>{
                for(let i = 1;i < 20;i++){
                    let geting = `strIngredient${i}`
                    const getingredients = `
                    <div>${res.data.meals[0][geting]}</div><br>
                    `
                    ingred.innerHTML += getingredients
                }
            })
            ingredient()
            
        });
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php').then((res) => {
        console.log(res.data);
        const getexplore = document.getElementById('explore')
        const category = document.getElementById('category');
        
        getexplore.addEventListener('click',()=>{
                category.innerHTML = ''
                for(i = 0; i < res.data.categories.length; i++){
                    category.innerHTML += `
                    <div style='display: flex; flex-direction: column; align-items: center; justify-content: center; border: 3px solid black; border-radius: 10px; background-color: rgba(255, 255, 255, 0.4); max-width: fit-content'; padding: 10px>
                    <img style='border-radius: 10px' src="${res.data.categories[i]['strCategoryThumb']}">
                    <li class='spec' style='list-style: none; font-weight: bold; font-size: 30px'>${res.data.categories[i]['strCategory']}</li>
                    </div>
                    `
                }
        })
    });
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
    .then((res) => {
        console.log(res.data);
        const results = document.getElementById('searchedresults')
        const searched = document.getElementById('searchedcategory');
        searched.innerHTML = ''
        if(userInput != ''){
            results.innerHTML = `<h1 style='font-weight: bold;font-size: 50px;  text-shadow: 2px 3px 1px black;
            text-align: center;color:rgb(61, 255, 8)'>Searched results</h1>`
            searched.innerHTML = ''
            for(let i = 0;i < res.data.meals.length;i++){
                let dishname2 = res.data.meals[i].strMeal
                let dishimage2 = res.data.meals[i].strMealThumb
                let catdish = `
                <div style='display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid black; border-radius: 10px; background-color: rgba(255, 255, 255, 0.458);'>
                <img style='border-radius: 10px;' class='searchedimg' src="${dishimage2}"/>
                <h2 style = 'align-items: center; font-weight: bold; text-align: center;'>${dishname2}</h2>
                </div>
                `
                searched.innerHTML += catdish
            }
        }
        const clearsearch = document.getElementById('clearbtn')
        clearsearch.addEventListener('click',()=>{
            searched.innerHTML = ''
            searchcategory.value = ''
        })
        document.getElementById('clearbtn').addEventListener('click',()=>{
            results.innerHTML = ''
        })
    });
}
getData();
