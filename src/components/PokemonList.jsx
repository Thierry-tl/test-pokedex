import { useState, useEffect, useRef } from 'react';
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonApi';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 8; // Charger 8 Pokémon à la fois
  const loaderRef = useRef(null);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemons(offset, limit);
        
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            return await fetchPokemonDetails(id);
          })
        );
        
        setPokemons(prev => [...prev, ...detailedPokemons]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, [offset]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setOffset(prev => prev + limit);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="pokemon-list">
      <h1>Pokédex</h1>
      
      <div className="vertical-list">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        <div ref={loaderRef} className="loader">
          {loading && <p>Chargement...</p>}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;