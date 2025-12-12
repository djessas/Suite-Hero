// Charger le JSON
async function loadHeroes() {
    const res = await fetch("heroes.json");
    const heroes = await res.json();
    return heroes;
}

//  LocalStorage
function saveToLocalStorage(heroes) {
    localStorage.setItem("heroes", JSON.stringify(heroes));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("heroes"));
}

// Afficher les héros
function displayHeroes(list) {
    const container = document.getElementById("heroes");
    container.innerHTML = "";

    list.forEach(hero => {
        container.innerHTML += `
            <div class="hero">
                <h3>${hero.name}</h3>
                <p>${hero.power}</p>
                <button onclick="deleteHero(${hero.id})">Supprimer</button>
            </div>
        `;
    });
}

// Supprimer un héros
function deleteHero(id) {
    let heroes = getFromLocalStorage();
    heroes = heroes.filter(h => h.id !== id);
    saveToLocalStorage(heroes);
    displayHeroes(heroes);
}

//Barre de chargement
async function init() {

    const loader = document.getElementById("loader");
    loader.style.width = "30%";

    let heroes = getFromLocalStorage();

    if (!heroes) {
        loader.style.width = "60%";
        heroes = await loadHeroes();
        saveToLocalStorage(heroes);
    }

    loader.style.width = "100%";
    setTimeout(() => loader.style.display = "none", 500);

    displayHeroes(heroes);
}

// Recherche

// Formulaire d'ajout
document.getElementById("addHeroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("heroName").value;
    const power = document.getElementById("heroPower").value;

    let heroes = getFromLocalStorage();

    const newHero = {
        id: Date.now(),
        name,
        power
    };

    heroes.push(newHero);

    saveToLocalStorage(heroes);
    displayHeroes(heroes);

    this.reset();
});

init();
