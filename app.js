import { getPokemon} from "./data.js";
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/"

//Traigo el id de la poke card
const pokeCardContainer = document.getElementById(
    "poke-card-container"
  );
//Traigo el id del input
  const pokeInput = document.getElementById("poke-input");
//Genero un evento en en el input
  pokeInput.addEventListener("change", async () => {
    const pokeId = pokeInput.value.trim();

    if ( pokeId <1 || pokeId > 1025 ) {
        renderPokemonCard(null); // No mostrar tarjeta
        alert("Ingresa un id valido");
        pokeInput.value = "";
        return; //finaliza la funcion
      }

      try {
        const pokeData = await getPokemon(pokeId);
        renderPokemonCard(pokeData);
      } catch (error) {
        console.error("Error al pedir los datos:", error);
        renderPokemonCard(null); // No mostrar tarjeta
      }
    });

    function renderPokemonCard(pokeData) {
      if (!pokeData) {
      pokeCardContainer.innerHTML = "";
        return;
      }
      const { name, sprites, stats, types, abilities,  } = pokeData;

      const pokeCard = document.createElement("div");
      pokeCard.classList.add("poke-card");
    
      const pokeImage = document.createElement("img");
      pokeImage.src = sprites.other["official-artwork"].front_default;
      pokeImage.alt = name;
    
      const pokeName = document.createElement("h2");
      pokeName.textContent = name;
    
    //Estadisticas (método foreach)
      const pokeStats = document.createElement("p");
    pokeStats.textContent = "Estadísticas:";
    stats.forEach(stat => {
        const statText = document.createElement("span");
        statText.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        pokeStats.appendChild(statText);
    }); 

    //Tipo (método foreach)

    const pokeTypes = document.createElement("p");
    pokeTypes.textContent = "Tipo:";
    types.forEach(type => {
        const typeText = document.createElement("span");
        typeText.textContent = `${type.type.name}, `;
        pokeTypes.appendChild(typeText);
    });

    //Habilidades (método foreach)

    const pokeAbilities = document.createElement("p");
    pokeAbilities.textContent = "Habilidades:";
    abilities.forEach(ability => {
        const abilityText = document.createElement("span");
        abilityText.textContent = `${ability.ability.name}, `;
        pokeAbilities.appendChild(abilityText);
    });

      pokeCard.appendChild(pokeImage);
      pokeCard.appendChild(pokeName);
      //pokeCard.appendChild(pokeStats);  //Lo negué para que no aparezca las estadísticas
      pokeCard.appendChild(pokeTypes);
      pokeCard.appendChild(pokeAbilities);

 
      pokeCardContainer.appendChild(pokeCard);
    };

    pokeInput.addEventListener("input", () => {
      renderPokemonCard(null); // No mostrar tarjeta
    });
  
   //Crear filtrado x lista

   botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;//exacatamente lo que tenemos en html

    pokeCardContainer.innerHTML = "";

    for (let i = 1; i <= 1025; i++) {
        fetch(URL+i)
            .then((response) => response.json())
            .then(data => {
                   console.log(data.types.map(type=> type.type.name));
                if(botonId === "ver-todos") {
                  renderPokemonCard(data);
                    console.log(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                      renderPokemonCard(data);
                    }
                }

            })
        }}))
      ;
