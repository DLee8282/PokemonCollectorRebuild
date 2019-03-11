package com.revature.model;

import java.util.List;

import com.revature.dao.PokemonDaoImpl;
import com.revature.dao.UserDaoImpl;
import com.revature.services.AppServices;

public class PokedexBuilder {
	
	public User buildUser(int uId) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.getUserById(uId);
	}
	
	public List<Pokemon> buildPokemonList(int uId){
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getPokemonByUserId(uId);
	}

}
