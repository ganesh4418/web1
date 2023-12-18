package com.website.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.BeautoSiteResponseDto;
import com.website.Dto.ErrorResponseDto;
import com.website.Dto.ScheduleMeetingRequestDto;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.service.RequestService;
import com.website.service.ScheduleMeetingService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Log4j
public class ScheduleMeetingController {

	@Autowired
	private ScheduleMeetingService scheduleMeetingService;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;

	//static final Logger LOGGER = LogManager.getLogger(ScheduleMeetingController.class);

	@PostMapping("/scheduleMeeting")
	public Object CreateBeautoSite(@RequestBody ScheduleMeetingRequestDto request,HttpServletRequest request1) {
		IpDetails idetails=new IpDetails(); 
		log.info("ScheduleMeetingServiceImpl request to createScheduleMeeting " + request);
		ErrorResponseDto response = new ErrorResponseDto(); // For Response
		CommonValidation validation = new CommonValidation();
		Object response1 = new BeautoSiteResponseDto();
		// Validate request parameters
		if (validation.validateStringValues(request.getFirstName())) {
			response.setResponseCode(EnumResponseCodes.ER102.getCode());
			response.setResponsemessage(EnumResponseCodes.ER102.getMessage() + " : " + request.getFirstName());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getFirstName())) {

			response.setResponseCode(EnumResponseCodes.ER107.getCode());
			response.setResponsemessage(EnumResponseCodes.ER107.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.lengthString(request.getFirstName())) {

			response.setResponseCode(EnumResponseCodes.ER141.getCode());
			response.setResponsemessage(EnumResponseCodes.ER141.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.validationSpace(request.getFirstName())) {
			response.setResponseCode(EnumResponseCodes.ER147.getCode());
			response.setResponsemessage(EnumResponseCodes.ER147.getMessage());
			log.error(response);
			return response;
		}

		if (validation.validateStringValues(request.getLastName())) {
			response.setResponseCode(EnumResponseCodes.ER103.getCode());
			response.setResponsemessage(EnumResponseCodes.ER103.getMessage() + " : " + request.getLastName());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getLastName())) {

			response.setResponseCode(EnumResponseCodes.ER111.getCode());
			response.setResponsemessage(EnumResponseCodes.ER111.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.lengthString(request.getLastName())) {

			response.setResponseCode(EnumResponseCodes.ER142.getCode());
			response.setResponsemessage(EnumResponseCodes.ER142.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.validationSpace(request.getLastName())) {
			response.setResponseCode(EnumResponseCodes.ER148.getCode());
			response.setResponsemessage(EnumResponseCodes.ER148.getMessage());
			log.error(response);
			return response;
		}

		if (validation.validateStringValues(request.getCountry())) {
			response.setResponseCode(EnumResponseCodes.ER112.getCode());
			response.setResponsemessage(EnumResponseCodes.ER112.getMessage());
			log.error(response);
			return response;
		}

		if (validation.validateStringValues(request.getEmail())) {
			response.setResponseCode(EnumResponseCodes.ER108.getCode());
			response.setResponsemessage(EnumResponseCodes.ER108.getMessage() + ":-" + request.getEmail());
			log.error(response);
			return response;
		}
		if (!validation.validateEmail(request.getEmail())) {
			response.setResponseCode(EnumResponseCodes.ER105.getCode());
			response.setResponsemessage(EnumResponseCodes.ER105.getMessage() + ":-" + request.getEmail());
			
			log.error(response);
			return response;
		}

		if (!validation.validateNumber(request.getContactNumber())) {
			response.setResponseCode(EnumResponseCodes.ER104.getCode());
			response.setResponsemessage(EnumResponseCodes.ER104.getMessage() + ":-" + request.getContactNumber());
			log.error(response);
			return response;
		}
		if (validation.validateStringValues(request.getBriefForTheMeeting())) {
			response.setResponseCode(EnumResponseCodes.ER115.getCode());
			response.setResponsemessage(EnumResponseCodes.ER115.getMessage());
			log.error(response);
			return response;
		}
		if (validation.validateStringValues(request.getDate())) {
			response.setResponseCode(EnumResponseCodes.ER125.getCode());
			response.setResponsemessage(EnumResponseCodes.ER125.getMessage());
			log.error(response);
			return response;
		}
		// No validation errors, proceed to creating meeting
		try {
			response1 = scheduleMeetingService.createScheduleMeeting(request);
			String clientIp = requestService.getClientIp(request1);
			System.out.println("clientIp : "+ clientIp);
			idetails.setIp_address(clientIp);
			idetails.setRequest_Hit_date(new Date());
			idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.SCHEDULE_METTING_ENDPOINT);
			iprepo.save(idetails);
		} catch (Exception e) {
			log.error("scheduleMeetingServiceimpl request to createScheduleMeeting :{}" + request);
			response.setResponsemessage(EnumResponseCodes.ER509.getMessage());
			response.setResponseCode(EnumResponseCodes.ER509.getCode());
			return response;
		}
		return response1;
	}

}
