
let counter = 0;
function nextDrink() {
	counter++;
	getDrink()
	
}
function previousDrink() {
	counter--;
	getDrink()
}

function popDrink1(){
	document.querySelector('input').value = 'mojito'
	getDrink()
}
function popDrink2(){
	document.querySelector('input').value = 'old fashioned'
	getDrink()
}
function popDrink3(){
	document.querySelector('input').value = 'long island tea'
	getDrink()
}
function popDrink4(){
	document.querySelector('input').value = 'whiskey sour'
	getDrink()
}
function ingredient1(){
	document.querySelector('input').value = 'gin'
	getDrink()
}
function ingredient2(){
	document.querySelector('input').value = 'rum'
	getDrink()
}
function ingredient3(){
	document.querySelector('input').value = 'tequila'
	getDrink()
}
function ingredient4(){
	document.querySelector('input').value = 'vodka'
	getDrink()
}

function getDrink() {
	let drink = document.querySelector('input').value;
	let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;

	fetch(url)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		
		if(data.drinks == null){
			document.querySelector('#drinksFound').innerText = `No drinks found`;
		}
		else{
			document.querySelector('.drinksInfo').classList.remove('hidden')
			document.querySelector('#drinksFound').innerText = `(Drinks Found: ${data.drinks.length})`;
			document.querySelector('#drinkName').innerText = data.drinks[counter].strDrink;
			document.querySelector('#mainImg').src = data.drinks[counter].strDrinkThumb;
			document.querySelector('p').innerText = data.drinks[counter].strInstructions;
	
			const ingredients = [...Array(15)].map((_,i) => data.drinks[counter][`strIngredient${i+1}`]).filter(Boolean);
			const measurements = [...Array(15)].map((_,i) => data.drinks[counter][`strMeasure${i+1}`]).filter(Boolean);
			
			const ulIngredient = document.querySelector('#ingredients');
			while (ulIngredient.firstChild){
				ulIngredient.removeChild(ulIngredient.firstChild);
			} 
			ingredients.forEach((x, i) => {
				let li = document.createElement('li');
				if(measurements[i] != null)
					li.appendChild(document.createTextNode(`${measurements[i]} ${x}`));
				else 
					li.appendChild(document.createTextNode(x));
				ulIngredient.appendChild(li);
			}); 
		}

	})
	.catch(err => {
		console.log(`error ${err}`);
	});	
}

document.querySelector('#getCocktail').addEventListener('click', getDrink);
document.querySelector('#next').addEventListener('click', nextDrink);
document.querySelector('#prev').addEventListener('click', previousDrink);
document.querySelector('.popDrink1').addEventListener('click', popDrink1);
document.querySelector('.popDrink2').addEventListener('click', popDrink2);
document.querySelector('.popDrink3').addEventListener('click', popDrink3);
document.querySelector('.popDrink4').addEventListener('click', popDrink4);
document.querySelector('.ingredient1').addEventListener('click', ingredient1);
document.querySelector('.ingredient2').addEventListener('click', ingredient2);
document.querySelector('.ingredient3').addEventListener('click', ingredient3);
document.querySelector('.ingredient4').addEventListener('click', ingredient4);
