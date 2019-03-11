package com.revature.model;

import java.util.List;

public class Pokedex {
	
	private User owner;
	private List<Pokemon> ownedPokemon;
	
	public User getOwner() {
		return owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
	public List<Pokemon> getOwnedPokemon() {
		return ownedPokemon;
	}
	public void setOwnedPokemon(List<Pokemon> ownedPokemon) {
		this.ownedPokemon = ownedPokemon;
	}
	
	
}
