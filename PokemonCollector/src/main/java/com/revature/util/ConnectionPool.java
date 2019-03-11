package com.revature.util;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ConnectionPool {
	private static DataSource dataSource;
	private static final String JNDI_FILE = "java:/comp/env/jdbc/Pokemon";
	static{
		try {
			Context context = new InitialContext();
			Object lookup = context.lookup(JNDI_FILE);
			if(lookup != null){
				dataSource = (DataSource) lookup;
			}else{
				new RuntimeException("Cannot find file!");
			}
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
	public static DataSource getDataSource(){
		return dataSource;
	}
	
}
