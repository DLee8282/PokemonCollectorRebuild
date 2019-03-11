package com.revature.model;

public class Pokemon {
	
	//TODO: make dynamic if numPokemon will change
	public static int totalNumberOfUniquePokemon = 151;
	
	//instance members
	private int pokemonId;
	private String pokemonName;
	private int pokemonRarity;
	private Integer count = null;
	
	public Pokemon(int pId, String pName, int pRarity) {
		this.pokemonId =  pId;
		this.pokemonName = pName;
		this.pokemonRarity = pRarity;
	}
	
	public Pokemon(int pId, String pName, int pRarity, int count) {
		this.pokemonId =  pId;
		this.pokemonName = pName;
		this.pokemonRarity = pRarity;
		//this.pokemonCount = count;
	}
	
	public Pokemon() {
		
	}

	public int getPokemonId() {
		return pokemonId;
	}

	public void setPokemonId(int pokemonId) {
		this.pokemonId = pokemonId;
	}

	public String getPokemonName() {
		return pokemonName;
	}

	public void setPokemonName(String pokemonName) {
		this.pokemonName = pokemonName;
	}

	public int getPokemonRarity() {
		return pokemonRarity;
	}

	public void setPokemonRarity(int pokemonRarity) {
		this.pokemonRarity = pokemonRarity;
	}

	public static int getTotalNumberOfUniquePokemon() {
		return totalNumberOfUniquePokemon;
	}

	public static void setTotalNumberOfUniquePokemon(int totalNumberOfUniquePokemon) {
		Pokemon.totalNumberOfUniquePokemon = totalNumberOfUniquePokemon;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer pokemonCount) {
		this.count = pokemonCount;
	}

	public Integer decrementCount() {
		count = count -1;
		return count;
	}
	
}
