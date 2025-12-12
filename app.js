// Charger le JSON


//  LocalStorage


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
        saveToLocalStorage(heroes);
    }

    loader.style.width = "100%";
    setTimeout(() => loader.style.display = "none", 500);

    displayHeroes(heroes);
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
