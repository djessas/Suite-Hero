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

   
}

// Recherche
document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();

    let heroes = getFromLocalStorage();
    if (!heroes) return; 

    const filtered = heroes.filter(h =>
        h.name.toLowerCase().includes(query) ||
        h.power.toLowerCase().includes(query)
    );

    displayHeroes(filtered);
});

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
