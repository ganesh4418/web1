package com.website.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.website.model.PageDetailsModel;

@Repository
public interface PageRepository extends JpaRepository<PageDetailsModel, Integer> {

	
	@Query(value = "SELECT * FROM  public.page_details WHERE  description  LIKE %:description%", nativeQuery = true)
	public List<PageDetailsModel> getByDesc(String description);

	// SELECT * FROM public.Page_Details WHERE Page_Title LIKE %:pageTitle%
}
//SELECT * FROM public.Page_Details WHERE to_tsquery('pageTitle') @@ to_tsvector(Page_Details.Page_Title)
