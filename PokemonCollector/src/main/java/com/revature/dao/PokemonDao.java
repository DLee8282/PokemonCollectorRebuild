package com.revature.dao;

import java.util.List;

import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;

public interface PokemonDao {
	
	public Pokemon getPokemonById(int pokemonId);
	
	public Pokemon getPokemonByName( String pokemonName);
	
	public List<Pokemon> getAllPokemon();
	
	public List<Pokemon> getPokemonByType(PokemonType pType);
	
	public List<String> getTypesByPokemonId(int pokemonId);
	
	public int getRarityByPokemonId(int pokemonId);
	
	public boolean decrementPokemonCountByUserAndPokemonId(int uId, int pId);
	
	public boolean incrementPokemonCountByUserAndPokemonId(int uId, int pId);

	public Pokemon addPokemonByUserIdAndPokemonId(int uId, int pId);
	
	public List<Pokemon> getPokemonByUserId(int uId);
	
	public int getPokemonCountByUserIdAndPokemonId(int uId, int pId);
	
}
