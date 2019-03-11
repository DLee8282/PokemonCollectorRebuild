package com.revature.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.dao.PokemonDaoImpl;
import com.revature.dao.UserDaoImpl;
import com.revature.model.Pokedex;
import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;

public class AppServices {

	final static Logger log = Logger.getLogger(UserDaoImpl.class);

	private static AppServices appService = null;

	private AppServices() {
	}

	public static AppServices getAppService() {
		if (appService == null) {
			appService = new AppServices();
		}
		return appService;
	}

	// PASSED
	public Pokemon getPokemonById(int pokemonId) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getPokemonById(pokemonId);
	}

	// PASSED
	public List<Pokemon> getAllPokemon() {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getAllPokemon();
	}

	// PASSED
	public int generateSaleValue(int pokemonId) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		int baseRarity = pokemonDao.getRarityByPokemonId(pokemonId);

		// CALCULATING SALE VALUE
		int saleValue = baseRarity / 10;

		return saleValue;
	}

	// PASSED
	public List<Pokemon> getPokemonByType(PokemonType pType) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getPokemonByType(pType);
	}

	// PASSED
	public List<String> getTypesByPokemonId(int pokemonId) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getTypesByPokemonId(pokemonId);
	}

	// PASSED
	public int getRarityByPokemonId(int pokemonId) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		return pokemonDao.getRarityByPokemonId(pokemonId);
	}

	// PASSED
	public int sellAllDuplicatePokemonByUserId(int userId) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		int newCreditTotal = userDao.getUserCredit(userId);
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		List<Pokemon> userPokemon = pokemonDao.getPokemonByUserId(userId);
		Iterator<Pokemon> it = userPokemon.iterator();
		while (it.hasNext()) {
			Pokemon nextPokemon = (Pokemon) it.next();
			int pokemonId = nextPokemon.getPokemonId();
			while (nextPokemon.getCount() > 1) {
				if (pokemonDao.decrementPokemonCountByUserAndPokemonId(userId, pokemonId)) {
					newCreditTotal += generateSaleValue(pokemonId);
					nextPokemon.decrementCount();
				}
			}
		}

		userDao.updateUserCredit(newCreditTotal, userId);
		return newCreditTotal;
	}

	// PASSED
	public int sellDuplicateByUserAndPokemonId(int uId, int pId) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		int newCreditTotal = userDao.getUserCredit(uId);
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		int count = pokemonDao.getPokemonCountByUserIdAndPokemonId(uId, pId);
		if (count > 0) {
			pokemonDao.decrementPokemonCountByUserAndPokemonId(uId, pId);
			newCreditTotal += generateSaleValue(pId);
			count--;
		}

		userDao.updateUserCredit(newCreditTotal, uId);
		return newCreditTotal;
	}

	// PASSED
	public Pokemon generateAndAddRandomPokemon(int uId) {

		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();

		int randomPokemonId = (int) Math.floor((Math.random() * Pokemon.totalNumberOfUniquePokemon)) + 1;
		Pokemon randomPokemon = pokemonDao.getPokemonById(randomPokemonId);

		pokemonDao.addPokemonByUserIdAndPokemonId(uId, randomPokemonId);
		randomPokemon.setCount(pokemonDao.getPokemonCountByUserIdAndPokemonId(uId, randomPokemonId));

		return randomPokemon;
	}

	// PASSED
	public Pokemon buyPokemon(int uId, int pId) {
		PokemonDaoImpl pokemonDao = PokemonDaoImpl.getPokemonDao();
		UserDaoImpl userDao = UserDaoImpl.getUserDao();

		Pokemon pokemonToBuy = null;
		
		int pokemonCost = pokemonDao.getRarityByPokemonId(pId);

		int userCredits = userDao.getUserCredit(uId);

		if (userCredits > pokemonCost) {
			userCredits -= pokemonCost;
			userDao.updateUserCredit(userCredits, uId);
			log.info("Class: AppServices Method: buyPokemon /n"
					+ "	userCredits: " + userCredits + " - PokemonCost: " + pokemonCost);
			pokemonDao.addPokemonByUserIdAndPokemonId(uId, pId);
			pokemonToBuy = pokemonDao.getPokemonById(pId);
		}

		return pokemonToBuy;
	}

	// PASSED
	public List<User> getLeaderBoard() {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.getLeaderBoard();
	}

	// PASSED
	public User checkUserCredentials(String username, String password) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.checkUserCredentials(username, password);
	}

	// PASSED
	public boolean createUser(User newUser) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.createUser(newUser);
	}
	
	// PASSED
	public boolean modifyUser(User updateUser) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.updateUser(updateUser);
	}

	// PASSED
	public User getUserById(int uId) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.getUserById(uId);
	}

	// PASSED
	public boolean validateUsername(String username) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.validateUsername(username);
	}
	
	// PASSED
	public boolean validateEmail(String email) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.validateEmail(email);
	}
	
	public boolean updateUser(User user) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.updateUser(user);
	}

	public int getPokemonCountByUserIdAndPokemonId(int uId, int pId) {
		PokemonDaoImpl pokeDao = new PokemonDaoImpl();
		return pokeDao.getPokemonCountByUserIdAndPokemonId(uId, pId);
	}
}
