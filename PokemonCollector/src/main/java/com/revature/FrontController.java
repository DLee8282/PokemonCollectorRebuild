package com.revature;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlets.DefaultServlet;

public class FrontController extends DefaultServlet {
	
	private static final long serialVersionUID = 3393437984391380230L;
	private Dispatcher dp = new Dispatcher();
	
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response)
				throws IOException, ServletException {
			if (request.getRequestURI().contentEquals("/PokemonCollector/")
					|| request.getRequestURI().contains("/static/")) {
						//super.doGet handles web pages 
						super.doGet(request, response);
					}
			else {
				dp.process(request, response);
			}
		}
		
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response)
				throws IOException, ServletException {
			doGet(request, response);
		}
	
}
