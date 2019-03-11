package com.revature.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.util.ConnectionPool;
import com.revature.util.JDBCConnectionUtil;

public class PokemonDaoImpl implements PokemonDao {
	
	final static Logger log = Logger.getLogger(PokemonDaoImpl.class);
	
	//Singleton Implementation
	private static PokemonDaoImpl pokemonDao = null;
	
	public PokemonDaoImpl() {}
	
	public static PokemonDaoImpl getPokemonDao() {
		if(pokemonDao == null) {
			pokemonDao = new PokemonDaoImpl();
		}
		return pokemonDao;
	}

	@Override
	public Pokemon getPokemonById(int pokemonId) {
		Pokemon pokeToGet = null;
		ResultSet rs;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			if(rs.next()) {
				pokeToGet = new Pokemon();
				pokeToGet.setPokemonId(rs.getInt("pokemon_id"));
				pokeToGet.setPokemonName(rs.getString("poke_name"));
				pokeToGet.setPokemonRarity(rs.getInt("rarity"));
				
				ps.close();
				rs.close();
			}
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method getPokemonById()");
		}
		return pokeToGet;
	}

	@Override
	public Pokemon getPokemonByName(String pokemonName) {
		Pokemon pokeToGet = null;
		ResultSet rs;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where poke_name = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString( 1 , pokemonName );
			rs = ps.executeQuery();
			
			ps.close();
			rs.close();
			if(rs.next()) {
				pokeToGet = new Pokemon();
				pokeToGet.setPokemonId(rs.getInt("pokemon_id"));
				pokeToGet.setPokemonName(rs.getString("poke_name"));
				pokeToGet.setPokemonRarity(rs.getInt("rarity"));
			}
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method getPokemonById()");
		}
		return pokeToGet;
	}

	@Override
	public List<Pokemon> getAllPokemon() {
		List<Pokemon> allPokemon = null;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon";
			PreparedStatement ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				allPokemon = new ArrayList<Pokemon>();
				Pokemon firstPokemon = new Pokemon();
				firstPokemon.setPokemonId(rs.getInt("pokemon_id"));
				firstPokemon.setPokemonName(rs.getString("poke_name"));
				firstPokemon.setPokemonRarity(rs.getInt("rarity"));
				allPokemon.add(firstPokemon);
			}
			while(rs.next()) {
				Pokemon nextPokemon = new Pokemon();
				nextPokemon.setPokemonId(rs.getInt("pokemon_id"));
				nextPokemon.setPokemonName(rs.getString("poke_name"));
				nextPokemon.setPokemonRarity(rs.getInt("rarity"));
				allPokemon.add(nextPokemon);
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getAllPokemon()");
		}
		return allPokemon;
	}

	@Override
	public List<Pokemon> getPokemonByType(PokemonType pType) {
		List<Pokemon> pokemonOfType = null;
		ResultSet rs;
		String pokemonType = "" + pType;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_type where type_name = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString( 1 , pokemonType.toLowerCase());
			rs = ps.executeQuery();
			if(rs.next()) {
				pokemonOfType = new ArrayList<Pokemon>();
				int typeId = rs.getInt("type_id");

				ResultSet rs2;
				String sql2 = "select * from tbl_pokemon_to_type where type_id = ?";
				PreparedStatement ps2 = conn.prepareStatement(sql2);
				ps2.setInt(1,  typeId);
				rs2 = ps2.executeQuery();
				
				while(rs2.next()) {
					Pokemon nextPokemon = getPokemonById(rs2.getInt("pokemon_id"));
					pokemonOfType.add(nextPokemon);
					
				}
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getTypesByPokemonId()");
		}
		return pokemonOfType;
	}

	@Override
	public List<String> getTypesByPokemonId(int pokemonId) {
		List<String> pokemonsTypes = new ArrayList<String>();
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon_to_type where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			while(rs.next()) {
				ResultSet rs2;
				int typeId = rs.getInt("type_id");
				String sql2 = "select * from tbl_type where type_id = ?";
				PreparedStatement ps2 = conn.prepareStatement(sql2);
				ps2.setInt(1,  typeId);
				rs2 = ps2.executeQuery();
				if(rs2.next()) {
					pokemonsTypes.add(rs2.getString("type_name"));
				}
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getTypesByPokemonId()");
		}
		return pokemonsTypes;
	}

	@Override
	public int getRarityByPokemonId(int pokemonId) {
		int rarity = -1;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			if(rs.next()) {
				rarity = rs.getInt("rarity");
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			rarity = -1;
			log.info("Error in Class PokemonDaoImpl: Method getRarityByPokemonId()");
		}
		return rarity;
	}
	
	public List<Pokemon> getPokemonByUserId(int uId) {
		ResultSet rs;
		List<Pokemon> userPokemon = new ArrayList<Pokemon>();
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "SELECT * FROM VW_USER_COLLECTION_FULL WHERE USER_ID = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1 ,uId);
			rs = ps.executeQuery();
			while(rs.next()) {
				Pokemon nextPokemon = new Pokemon();
				nextPokemon.setPokemonId(rs.getInt("POKEMON_ID"));
				nextPokemon.setPokemonName(rs.getString("POKE_NAME"));
				nextPokemon.setPokemonRarity(rs.getInt("RARITY"));
				nextPokemon.setCount(rs.getInt("AMOUNT"));
				userPokemon.add(nextPokemon);
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			userPokemon = null;
			log.info("Error in Class PokemonDaoImpl: Method getPokemonByUserId()");
		}
		return userPokemon;
	}	

	@Override
	public boolean decrementPokemonCountByUserAndPokemonId(int uId, int pId) {
		boolean isDecremented = false;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "UPDATE tbl_user_to_pokemon set amount = amount -1 where user_id = ? AND pokemon_id = ?";
			PreparedStatement cs = conn.prepareStatement(sql);
			cs.setInt( 1 , uId );
			cs.setInt( 2 , pId );
			if(cs.executeUpdate() >=1) {
				isDecremented = true;
			}
			
			cs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method addPokemonByUserIdAndPokemonId()");
		}
		return isDecremented;
	}
	
	@Override
	public Pokemon addPokemonByUserIdAndPokemonId(int uId, int pId) {
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "call prc_insert_user_collection(?,?)";
			CallableStatement cs = conn.prepareCall(sql);
			cs.setInt( 1 , uId );
			cs.setInt( 2 , pId );
			cs.execute();
			
			cs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method addPokemonByUserIdAndPokemonId()");
		}
		return getPokemonById(pId);
	}

	public int getPokemonCountByUserIdAndPokemonId(int uId, int pId) {
		int userPokemonCount = 0;
		ResultSet rs;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select amount from tbl_user_to_pokemon where user_id = ? and pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , uId );
			ps.setInt( 2 , pId );
			rs = ps.executeQuery();
			if(rs.next()) {
				userPokemonCount = rs.getInt("amount");
			}
			
			ps.close();
			rs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method addPokemonByUserIdAndPokemonId()");
		}
		return userPokemonCount;
	}
	
	public boolean incrementPokemonCountByUserAndPokemonId(int uId, int pId) {
		boolean isIncremented = false;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "UPDATE tbl_user_to_pokemon SET amount = amount + 1 WHERE user_id = ? AND pokemon_id = ?";
			PreparedStatement cs = conn.prepareStatement(sql);
			cs.setInt( 1 , uId );
			cs.setInt( 2 , pId );
			if(cs.executeUpdate() >=1) {
				isIncremented = true;
			}
			
			cs.close();
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method addPokemonByUserIdAndPokemonId()");
		}
		return isIncremented;	
	}
}
