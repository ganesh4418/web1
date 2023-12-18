package com.website.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.SearchRequestDto;
import com.website.model.IpDetails;
import com.website.model.PageDetailsModel;
import com.website.repository.IpRepository;
import com.website.service.RequestService;
import com.website.serviceimpl.PageDetailsServiceImpl;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Log4j
public class PageDetailsController {
	@Autowired
	private PageDetailsServiceImpl pagedetails;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;


	//private static final Logger LOGGER = LogManager.getLogger(PageDetailsController.class);

	@PostMapping("/search")
	public List<PageDetailsModel> searchPlants(@RequestBody SearchRequestDto request,HttpServletRequest request1) {
		IpDetails idetails=new IpDetails();
	List<PageDetailsModel> pageDetailsmodel= new ArrayList<>(); 
		log.info("In PageDetailsController sending PageDetailsServiceImpl : " + request);
		pageDetailsmodel=pagedetails.findallDetails(request.getDescription());
		String clientIp = requestService.getClientIp(request1);
		System.out.println("clientIp : "+ clientIp);
		idetails.setIp_address(clientIp);
		idetails.setRequest_Hit_date(new Date());
		idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.SEARCH_ENDPOINT);
		iprepo.save(idetails);
		return pageDetailsmodel;
		
	}
}