const PokemonCard = ({ pokemon }) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      // ... autres types
    };
  
    return (
      <div className="pokemon-card" 
           style={{ backgroundColor: typeColors[pokemon.types[0].type.name] || '#777' }}>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <h3>{pokemon.name}</h3>
        <div className="types">
          {pokemon.types.map(type => (
            <span key={type.slot}>{type.type.name}</span>
          ))}
        </div>
        <p>#{pokemon.id.toString().padStart(3, '0')}</p>
      </div>
    );
  };
  
  export default PokemonCard;