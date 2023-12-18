package com.website.controller;

import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.website.Dto.ErrorResponseDto;
import com.website.Dto.UserRequestDto;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.service.RequestService;
import com.website.service.UserService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Log4j
public class SiteController {
	@Autowired
	private UserService userService;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;
	//private static final Logger LOGGER = LogManager.getLogger(SiteController.class);

	@GetMapping("/")
	public void check() {
		log.info("welcome on server side: ");

		System.out.println("hello");
	}

	@PostMapping("/buildyourteam")
	public ErrorResponseDto createOrUpdateInvoice(@RequestBody UserRequestDto request,HttpServletRequest request1) {
		IpDetails idetails=new IpDetails(); 
		
		log.info("In UserService request to createOrUpdateInvoice {} " + request);
		ErrorResponseDto errorResponse = new ErrorResponseDto(); // For Response
		ErrorResponseDto response = new ErrorResponseDto();
		CommonValidation validation = new CommonValidation(); // validation response
		
		if (validation.validateStringValues(request.getOrganizationName())) {
			response.setResponseCode(EnumResponseCodes.ER122.getCode());
			response.setResponsemessage(EnumResponseCodes.ER122.getMessage() + " : " + request.getOrganizationName());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getOrganizationName())) {

			response.setResponseCode(EnumResponseCodes.ER123.getCode());
			response.setResponsemessage(EnumResponseCodes.ER123.getMessage());
			log.error(response);
			return response;
		}
		Pattern email = Pattern.compile("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$");
		try {
			Matcher matchEmail = email.matcher(request.getMailId());
			if (!matchEmail.matches()) {
				response.setResponseCode(EnumResponseCodes.ER108.getCode());
				response.setResponsemessage(EnumResponseCodes.ER108.getMessage() + " : " + request.getMailId());
				log.error(response);
				return response;
			}
		} catch (Exception e1) {
			log.error(e1);
			response.setResponseCode(EnumResponseCodes.ER128.getCode());
		response.setResponsemessage(EnumResponseCodes.ER128.getMessage());;
		}	
		if (validation.validateStringValues(request.getDescription())) {
			response.setResponseCode(EnumResponseCodes.ER129.getCode());
			response.setResponsemessage(EnumResponseCodes.ER129.getMessage() + " : " + request.getDescription());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getDescription())) {
			response.setResponseCode(EnumResponseCodes.ER130.getCode());
			response.setResponsemessage(EnumResponseCodes.ER130.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getBuildedTeam())) {
			response.setResponseCode(EnumResponseCodes.ER131.getCode());
			response.setResponsemessage(EnumResponseCodes.ER131.getMessage());
			log.error(response);
			return response;
		}

		userService.savedetails(request);
		String clientIp = requestService.getClientIp(request1);
		System.out.println("clientIp : "+ clientIp);
		idetails.setIp_address(clientIp);
		idetails.setRequest_Hit_date(new Date());
		idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.BUILD_YOUR_TEAM_ENDPOINT);
		iprepo.save(idetails);
		errorResponse.setResponseCode(EnumResponseCodes.S200.getCode());
		errorResponse.setResponsemessage(EnumResponseCodes.S200.getMessage());
		return response;
	}
}
