package com.website.service;

import java.util.List;

import com.website.model.PageDetailsModel;

public interface PageService {
	public List<PageDetailsModel> findallDetails(String searchquery);

}
