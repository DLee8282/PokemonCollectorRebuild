package com.revature.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;


public class JDBCConnectionUtil {
	
	final static Logger log = Logger.getLogger(JDBCConnectionUtil.class);

	public static Connection getConnection() throws SQLException  {
		try {
			InputStream dbProps = JDBCConnectionUtil.class.getClassLoader().getResourceAsStream("config.properties");
		    Properties prop = new Properties();
		    prop.load(dbProps);
			Class.forName(prop.getProperty("driver"));
			String url = prop.getProperty("url");
			String username = prop.getProperty("user");
			String password = prop.getProperty("pass");
			return DriverManager.getConnection(url,username,password);
		} catch (ClassNotFoundException | IOException e) {
			log.error("An exception was thrown in the ConnectionUtils class");
			log.error(e.getStackTrace());
		}
		return null;
	}
	
}
