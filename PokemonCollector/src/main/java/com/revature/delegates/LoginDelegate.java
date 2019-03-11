package com.revature.delegates;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.catalina.Session;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.Pokedex;
import com.revature.model.PokedexBuilder;
import com.revature.model.Pokemon;
import com.revature.model.User;
import com.revature.services.AppServices;

public class LoginDelegate {
	
	//Mapper that marshals the POJOs to JSON
	private final ObjectMapper mapper = new ObjectMapper();
	
	/**Creates a user and generates a JSON of the user information
	 * @param request HttpRequest
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void createUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		if (AppServices.getAppService().createUser(param)) {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString("true"));
		}
		else {
			response.setContentType("application/json");
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
	}
	
	/**Processes user login, validates, sends back JSON with all user credentials
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		User currentUser = AppServices.getAppService().checkUserCredentials(param.getUsername(), param.getPassword());
		response.setContentType("application/json");
		if (currentUser != null) {
		response.getWriter().append(mapper.writeValueAsString(currentUser));
		HttpSession session = request.getSession();
		session.setAttribute("USER", currentUser);
		}
		else {
		response.getWriter().append(mapper.writeValueAsString(currentUser));
		}
	}

	/**Performs the verification of the user name, checks for duplicates
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processUsername(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		response.setContentType("application/json");
		//User name exists
		if (AppServices.getAppService().validateUsername(param.getUsername())) {
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
		else { //User name is unique
			response.getWriter().append(mapper.writeValueAsString("true"));
		}
	}
	
	/**Performs the verification of the email, checks for duplicates
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processEmail(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		response.setContentType("application/json");
		//Email exists
		if (AppServices.getAppService().validateEmail(param.getEmail())) {
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
		else { //Email is unique
			response.getWriter().append(mapper.writeValueAsString("true"));
		}
	}
	
	/** Invalidates the current user session
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void editUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User param = mapper.readValue(request.getReader(), User.class); 
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(AppServices.getAppService().updateUser(param)));
	}
}
