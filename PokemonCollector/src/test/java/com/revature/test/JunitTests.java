package com.revature.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

import com.revature.dao.PokemonDaoImpl;
import com.revature.model.Pokedex;
import com.revature.model.PokedexBuilder;
import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;
import com.revature.services.AppServices;
public class JunitTests {

	User new_user = new User();
	Pokemon poke = new Pokemon();

// USER TESTS ------------------------------------------------------------
	
	@Test
	public void legitUser() {
		new_user.setFirstName("Test");
		new_user.setLastName("Case");
		new_user.setUsername("TetUsername");
		new_user.setPassword("password");
		new_user.setEmail("Test@Emal.com");
		new_user.setSuperUser(0);
		assertTrue(AppServices.getAppService().createUser(new_user));
	}

	@Test
	public void badLogin() {
		assertEquals(null,AppServices.getAppService().checkUserCredentials("Bad", "Login"));
	}
	@Test
	public void goodLogin() {
		User new_user = new User();
		new_user.setUsername("TestUsername");
		new_user.setPassword("password");
		assertEquals("testusername",AppServices.getAppService().checkUserCredentials("TestUsername", "password").getUsername());
	}
	@Test
	public void checkUsername() {
		assertFalse(AppServices.getAppService().validateUsername("TestUsername"));
	}
	@Test
	public void checkUsernameNotFound() {
		assertTrue(AppServices.getAppService().validateUsername("TestNotFound"));
	}
	@Test
	public void checkEmail() {
		assertFalse(AppServices.getAppService().validateEmail("Test@Email.com"));
	}
	@Test
	public void checkEmailNotFound() {
		assertTrue(AppServices.getAppService().validateEmail("TestNotFound"));
	}
	@Test
	public void checkUserID() {
		assertEquals("TEMP",AppServices.getAppService().getUserById(1).getUsername());
	}
	
//POKEMON TESTS -----------------------------------------
	
	@Test
	public void getPokeByID() {
		assertEquals("jigglypuff",AppServices.getAppService().getPokemonById(39).getPokemonName());
		
	}
	@Test
	public void getAllPokemon() {
		List<Pokemon> allpoke = AppServices.getAppService().getAllPokemon();
		assertEquals(151,allpoke.size());	
	}
	@Test
	public void getSaleValue() {
		assertEquals(35, AppServices.getAppService().generateSaleValue(58));
	}
	@Test
	public void getSaleValueNonWholeNum() {
		assertEquals(32, AppServices.getAppService().generateSaleValue(102));
	}
	@Test
	public void getPokeType() {
		List<Pokemon> steel = AppServices.getAppService().getPokemonByType(PokemonType.STEEL);
		assertNotNull(steel.size());
	}
	@Test
	public void getTypeByID() {
		List<String> types = AppServices.getAppService().getTypesByPokemonId(1);
		assertEquals(2,types.size());
	}
	@Test
	public void getRareID() {
		assertEquals(205,AppServices.getAppService().getRarityByPokemonId(11));
	}
	@Test
	public void generateRandomPokemon() {
		assertNotNull(AppServices.getAppService().generateAndAddRandomPokemon(1));
	}
	
	@Test
	public void buyPokemon() {
		assertEquals("bulbasaur", AppServices.getAppService().buyPokemon(3, 1).getPokemonName());
	}
	@Test
	public void buyPokemonNoCredits() {
		assertNull(AppServices.getAppService().buyPokemon(1, 1));
	}
	@Test @Ignore
	public void getAllPokemonForUser() {
		List<Pokemon> allpok = PokemonDaoImpl.getPokemonDao().getPokemonByUserId(1);
		for (Pokemon p : allpok) {
			System.out.println(p.getPokemonName());
		}
	}
 	@Test @Ignore
	public void sellAllDupPokemon() {
		User gooduser = AppServices.getAppService().checkUserCredentials("TestUsername", "password");
		assertEquals(gooduser.getScore(),
				AppServices.getAppService().sellAllDuplicatePokemonByUserId(gooduser.getUserId()));
	}
	
	@Test @Ignore
	public void sellDupSpecificPokemon() {
		User user = AppServices.getAppService().checkUserCredentials("TestUsername", "password");
		assertEquals(user.getScore(),
				AppServices.getAppService().sellDuplicateByUserAndPokemonId(user.getUserId(),124));
	}
	
}
