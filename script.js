const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const healthPoints = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const sprite = document.getElementById("sprite-container");
const types = document.getElementById("types");

//Fetch pokemon data
const fetchPokemon = async () => {
  try {
    const userInput = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput}`
    );
    const pokemonData = await response.json();
    setStats(pokemonData);
    setPokemonInfo(pokemonData);
    setPokemonTypes(pokemonData);
  } catch (error) {
    alert(`Pokémon ${searchInput.value} not found`);
    clean();
    console.error(error);
  }
};

const setStats = (pokemonData) => {
  healthPoints.textContent = pokemonData.stats[0].base_stat;
  attack.textContent = pokemonData.stats[1].base_stat;
  defense.textContent = pokemonData.stats[2].base_stat;
  specialAttack.textContent = pokemonData.stats[3].base_stat;
  specialDefense.textContent = pokemonData.stats[4].base_stat;
  speed.textContent = pokemonData.stats[5].base_stat;
};

const setPokemonInfo = (pokemonData) => {
  pokemonName.textContent = `${pokemonData.name.toUpperCase()}`;
  pokemonID.textContent = `#${pokemonData.id}`;
  weight.textContent = `Weight: ${pokemonData.weight}`;
  height.textContent = `Height: ${pokemonData.height}`;
  sprite.innerHTML = `
    <img class="pokemon-sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" id="sprite"/>
  `;
};

const setPokemonTypes = (pokemonData) => {
  types.innerHTML = pokemonData.types
    .map((typeObject) => {
      return `
            <span class="type ${typeObject.type.name}">${typeObject.type.name}</span>
        `;
    })
    .join("");
};

const clean = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) {
    sprite.parentNode.removeChild(sprite);
  }

  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  searchInput.value = "";
};

searchButton.addEventListener("click", fetchPokemon);
