import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const fetchPokemons = async (offset = 0, limit = 20) => {
  try {
    const response = await api.get(`pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      api.get(`pokemon/${id}`),
      api.get(`pokemon-species/${id}`),
    ]);
    
    return {
      ...pokemonResponse.data,
      species: speciesResponse.data,
    };
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    throw error;
  }
};