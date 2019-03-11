package com.revature;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.revature.delegates.HomeDelegate;
import com.revature.delegates.LoginDelegate;

public class Dispatcher {

	// Handles user session/account manipulation
	private HomeDelegate hd = new HomeDelegate();

	// Handles login and logout processes and user creation
	private LoginDelegate ld = new LoginDelegate();

	/**
	 * @param request  HttpServletRequest
	 * @param response HttpServletResponse
	 * @throws ServletException
	 * @throws IOException
	 */
	public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String switchString = request.getRequestURI().substring(request.getContextPath().length() + 1);
		while (switchString.indexOf("/") > 0) {
			// If there the URL contains /, get the substring of the URL
			switchString = switchString.substring(0, switchString.indexOf("/"));
		}
		switch (switchString) {
		/*
		 * Creates a new user for the website
		 * 
		 * @POST: Creates a user
		 * 
		 * @return: true if successful, false if unsuccessful
		 */
		case "create":
			if ("POST".equals(request.getMethod())) {
				ld.createUser(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		/*
		 * Checks the username
		 * 
		 * @POST: Checks the username
		 * 
		 * @return: true if unique
		 */
		case "checkUser":
			if ("POST".equals(request.getMethod())) {
				ld.processUsername(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		/*
		 * Checks the email
		 * 
		 * @POST: Checks the email
		 * 
		 * @return: true if unique
		 */
		case "checkEmail":
			if ("POST".equals(request.getMethod())) {
				ld.processEmail(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		/*
		 * Validates existing user login
		 * 
		 * @POST: Checks login
		 * 
		 * @return: JSON with user information (null if empty)
		 */
		case "login":
			if ("POST".equals(request.getMethod())) {
				ld.processLogin(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		case "update":
			if ("POST".equals(request.getMethod())) {
				ld.processLogin(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		/*
		 * Manipulates collection for the user
		 * 
		 * @POST: Gets all duplicates for a user
		 * 
		 * @GET: Get a users current collection
		 * 
		 * @return: JSON with Pokemon IDs for a particular user
		 */
		case "collection":
			if ("POST".equals(request.getMethod())) {
				hd.getUserDuplicates(request, response);		
			} 
			else if ("GET".equals(request.getMethod())) {
				hd.getUserCollection(request, response);
			}
			else {
				System.out.println("Not yet implemented");
			}
			break;
		/*
		 * Generates a random pokemon for a user
		 * 
		 * @GET: Generates a random pokemon for a user
		 * 
		 * @return: JSON with a random Pokemon
		 * 
		 */
		case "generate":
			if ("GET".equals(request.getMethod())) {
				hd.generatePokemon(request, response);
			} else
				System.out.println("Not yet implemented");
			break;
		/*
		 * Shop sell and buy functions
		 * 
		 * @GET: Redeems all or specific pokemon selected by user
		 * 
		 * @POST: Adds a Pokemon to a user collection if there is enough credit
		 * 
		 * @return: The updated user collection
		 */
		case "redeem":
			if ("GET".equals(request.getMethod())) {
				if (request.getParameter("POKEID") != null) {
					hd.sellSpecificPokemon(request, response);
				}
				else {
					hd.sellAllPokemon(request, response);
				}
			} 
			else if ("POST".equals(request.getMethod())) {
				hd.buyPokemon(request, response);
			}			
			else
				System.out.println("Not yet implemented");
			break;
		/*
		 * Returns the current leader board
		 * 
		 * @GET: Gets the leader board
		 * 
		 * @return JSON of leader board
		 */
		case "leader":
			if ("GET".equals(request.getMethod())) {
			hd.returnLeaderboard(request, response);
			}
			else
				System.out.println("Not yet implemented");
			break;
		/*
		 * Returns all pokemon for the shop
		 * 
		 * @GET: Returns all stored pokemon
		 * 
		 * @return: JSON of pokemon
		 */
		case "shop":
			if ("GET".equals(request.getMethod())) {
				hd.getAllPokemon(request, response);
			}
			break;
		default:
			System.out.println("Not yet implemented");

		}
	}
}
