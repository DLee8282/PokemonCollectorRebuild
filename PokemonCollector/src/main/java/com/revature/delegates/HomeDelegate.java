package com.revature.delegates;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.revature.model.Pokedex;
import com.revature.model.PokedexBuilder;
import com.revature.model.Pokemon;
import com.revature.model.User;
import com.revature.services.AppServices;

public class HomeDelegate {
	
	private final ObjectMapper mapper = new ObjectMapper();
	Pokedex pokedex = new Pokedex();
	PokedexBuilder pokebuild = new PokedexBuilder();
	
	/**Returns the current top 100 users in a JSON format
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void returnLeaderboard(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(AppServices.getAppService().getLeaderBoard()));
	}
	
	/**Generates and adds a random Pokemon and returns a JSON of the random Pokemon added
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void generatePokemon(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int id = Integer.parseInt(request.getParameter("USERID"));
		List<Pokemon> genPoke = new ArrayList<Pokemon>();
		Pokemon poke = AppServices.getAppService().generateAndAddRandomPokemon(id);
		poke.setCount(AppServices.getAppService().getPokemonCountByUserIdAndPokemonId(id, poke.getPokemonId()));
		pokedex.setOwner(pokebuild.buildUser(id));
		genPoke.add(poke);
		pokedex.setOwnedPokemon(genPoke);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(pokedex));
	}
	
	/** Sells all duplicate Pokemon for a user
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellAllPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID"));
		AppServices.getAppService().sellAllDuplicatePokemonByUserId(id);
		pokedex.setOwner(pokebuild.buildUser(id));
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(pokedex));
	}
	
	/** Sells a specific Pokemon the user specifies
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellSpecificPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int idUser = Integer.parseInt(request.getParameter("USERID"));
		int idPoke = Integer.parseInt(request.getParameter("POKEID"));
		AppServices.getAppService().sellDuplicateByUserAndPokemonId(idUser, idPoke);
		List<Pokemon> poke = pokebuild.buildPokemonList(idUser);
		response.setContentType("application/json");
		List<Pokemon> dup = new ArrayList<Pokemon>();
		for (Pokemon p : poke) {
			if (p.getCount() > 1) {
				dup.add(p);
			}
		}
		pokedex.setOwner(pokebuild.buildUser(idUser));
		pokedex.setOwnedPokemon(dup);
		response.getWriter().append(mapper.writeValueAsString(pokedex));
	}
	
	/**Buys a specific Pokemon and removes credits from users account
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void buyPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final ObjectNode node = new ObjectMapper().readValue(request.getReader(), ObjectNode.class);
		int idUser = node.get("USERID").asInt();
		int idPoke = node.get("POKEID").asInt();
		Pokemon poke = AppServices.getAppService().buyPokemon(idUser, idPoke);
		response.setContentType("application/json");
		if (poke != null) {
			pokedex.setOwner(pokebuild.buildUser(idUser));
			pokedex.setOwnedPokemon(pokebuild.buildPokemonList(idUser));
			response.getWriter().append(mapper.writeValueAsString(pokedex));
		}
		else {
			response.getWriter().append(mapper.writeValueAsString(poke));
		}
	}

	/**Gets a user collection
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getUserCollection(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID"));
		pokedex.setOwner(pokebuild.buildUser(id));
		pokedex.setOwnedPokemon(pokebuild.buildPokemonList(id));
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(pokedex));
	}
	
	/**Gets the duplicates of the pokemon
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getUserDuplicates(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		List<Pokemon> poke = pokebuild.buildPokemonList(param.getUserId());
		response.setContentType("application/json");
		List<Pokemon> dup = new ArrayList<Pokemon>();
		for (Pokemon p : poke) {
			if (p.getCount() > 1) {
				dup.add(p);
			}
		}
		response.getWriter().append(mapper.writeValueAsString(dup));
	}
	
	/** Returns all pokemon
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getAllPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(AppServices.getAppService().getAllPokemon()));
	}
}
