export async function getPokemon(id) {

    try {
      let url;
      if(!isNaN(id)){
        url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      } else {
        url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      return data;

    } catch (error) {
        console.error("Error en la Pokemon Data", error);
        throw error;
      }
    }

  
  


  