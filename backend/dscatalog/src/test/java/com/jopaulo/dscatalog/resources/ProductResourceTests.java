package com.jopaulo.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.jopaulo.dscatalog.dto.ProductDTO;
import com.jopaulo.dscatalog.services.ProductService;
import com.jopaulo.dscatalog.services.exceptions.ResourceNotFoundException;
import com.jopaulo.dscatalog.tests.Factory;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;

	private Long existingId;
	private Long nonExistingId;
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 2L;
		
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDTO));

		when(service.findAllPaged(any(), any(), any())).thenReturn(page);

		when(service.findById(existingId)).thenReturn(productDTO);
		when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
	}

	@Test
	public void findAllShouldReturnPage() throws Exception {
		ResultActions results = mockMvc.perform(get("/products").accept(MediaType.APPLICATION_JSON));

		results.andExpect(status().isOk());
	}

	@Test
	public void findByIdShouldReturnProductWhenIdExists() throws Exception {
		ResultActions results = mockMvc.perform(get("/products/{id}", existingId).accept(MediaType.APPLICATION_JSON));

		results.andExpect(status().isOk());
//		results.andExpect(jsonPath("$.id").exists());
		results.andExpect(jsonPath("$.name").exists());
		results.andExpect(jsonPath("$.description").exists());
	}

	@Test
	public void findByIdShouldReturnNotFoundIdDoesNotExists() throws Exception {
		ResultActions results = mockMvc.perform(get("/products/{id}", nonExistingId).accept(MediaType.APPLICATION_JSON));

		results.andExpect(status().isNotFound());
	}

}
