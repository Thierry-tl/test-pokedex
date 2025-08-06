import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../services/pokemonApi';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokemon not found</p>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
      />
      
      <div className="info">
        <p>Height: {pokemon.height / 10}m</p>
        <p>Weight: {pokemon.weight / 10}kg</p>
        
        <div className="stats">
          <h3>Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name}>
              <span>{stat.stat.name}: {stat.base_stat}</span>
            </div>
          ))}
        </div>
        
        <div className="abilities">
          <h3>Abilities</h3>
          {pokemon.abilities.map(ability => (
            <span key={ability.ability.name}>{ability.ability.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;