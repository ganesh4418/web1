package com.website.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

//WriteUs Api


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.BeautoSiteRequestDto;
import com.website.Dto.BeautoSiteResponseDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.service.BeautoSiteService;
import com.website.service.RequestService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Log4j
public class BeautoSiteController {

	@Autowired
	private BeautoSiteService service;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;

//	static final Logger LOGGER = LogManager.getLogger(BeautoSiteController.class);

	@PostMapping("/writeUs")
	public Object CreateBeautoSite(@RequestBody BeautoSiteRequestDto request,HttpServletRequest request1)  {
		IpDetails idetails=new IpDetails();
		log.info("BeautoSiteServiceImpl is creating request Write us :- " + request);
		log.debug("BeautoSiteServiceImpl is creating request Write us :- " + request);
		ErrorResponseDto errorResponseDto = new ErrorResponseDto(); // For Response
		Object response = new BeautoSiteResponseDto();
		CommonValidation validation = new CommonValidation();// Validation

		// Validate request parameters
		if (validation.validateStringValues(request.getFirstName())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER102.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER102.getMessage() + " : " + request.getFirstName());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (!validation.validationString(request.getFirstName())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER107.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER107.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (!validation.validationSpace(request.getFirstName())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER147.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER147.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (!validation.lengthString(request.getFirstName())) {

			errorResponseDto.setResponseCode(EnumResponseCodes.ER141.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER141.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (validation.validateStringValues(request.getLastName())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER103.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER103.getMessage() + " : " + request.getLastName());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (!validation.validationString(request.getLastName())) {

			errorResponseDto.setResponseCode(EnumResponseCodes.ER111.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER111.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (!validation.lengthString(request.getLastName())) {

			errorResponseDto.setResponseCode(EnumResponseCodes.ER142.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER142.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (!validation.validationSpace(request.getLastName())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER148.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER148.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (validation.validateStringValues(request.getCountry())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER112.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER112.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (validation.validateStringValues(request.getBriefForTheMeeting())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER115.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER115.getMessage());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (validation.validateStringValues(request.getEmail())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER108.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER108.getMessage() + ":-" + request.getEmail());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		if (!validation.validateEmail(request.getEmail())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER105.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER105.getMessage() + ":-" + request.getEmail());
			log.error(errorResponseDto);
			return errorResponseDto;
		}

		if (!validation.validateNumber(request.getContactNumber())) {
			errorResponseDto.setResponseCode(EnumResponseCodes.ER104.getCode());
			errorResponseDto
					.setResponsemessage(EnumResponseCodes.ER104.getMessage() + ":-" + request.getContactNumber());
			log.error(errorResponseDto);
			return errorResponseDto;
		}
		// No validation errors, proceed to creating meeting
		try {
			response = service.createBeautoSite(request);
			String clientIp = requestService.getClientIp(request1);
			System.out.println("clientIp : "+ clientIp);
			idetails.setIp_address(clientIp);
			idetails.setRequest_Hit_date(new Date());
			idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.WRITE_US_ENDPOINT);
			log.info("Call Service"+request);
			iprepo.save(idetails);
		} catch (Exception e) {
			errorResponseDto
					.setResponsemessage("BeautoSiteController fail to catch BeautoServiceImpl :- " + e.getMessage());
			errorResponseDto.setResponseCode(EnumResponseCodes.ER509.getCode());
			log.error(errorResponseDto );
			return errorResponseDto;
		}
		return response;
	}
}