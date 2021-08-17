package com.jopaulo.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.jopaulo.dscatalog.entities.Product;
import com.jopaulo.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository; 
	
	private long exintingId;
	private long noEexintingId;
	private long countTotalProducts;
	
	@BeforeEach
	void setUp() throws Exception{
		exintingId = 1L;
		noEexintingId = 1000L;
		countTotalProducts = 25L;
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {		
		Product product = Factory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1, product.getId());
	}

	@Test
	public void deleteShoudDeleteObjectWhenIdExists() {		
		repository.deleteById(exintingId);
		
		Optional<Product> result = repository.findById(exintingId);
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShoudThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(noEexintingId);
		});
	}
	
	@Test
	public void findByIdSholdReturnNonEmptyOptionalWhenIdExists() {		
		Optional<Product> result = repository.findById(exintingId);
		
		Assertions.assertTrue(result.isPresent());
	}
	
	@Test
	public void findByIdSholdReturnNonEmptyOptionalWhenIdDoesNotExists() {		
		Optional<Product> result = repository.findById(noEexintingId);
		
		Assertions.assertTrue(result.isEmpty());
	}
}
