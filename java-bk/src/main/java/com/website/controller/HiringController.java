package com.website.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.ErrorResponseDto;
import com.website.Dto.HiringRequestDto;
import com.website.Dto.HiringResponseDto;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.service.HiringService;
import com.website.service.RequestService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Log4j
public class HiringController {

	@Autowired
	private HiringService hiringService;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;

	@PostMapping(value = "/hiring", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public Object savedetails(HiringRequestDto request,HttpServletRequest request1) {
		log.info("Exiting :: hiringController.hiringDataRequest request):===> {}   \":{}" + request);
		Object response = new HiringResponseDto(); 
		IpDetails idetails=new IpDetails();// DtoResponse
		ErrorResponseDto response1 = new ErrorResponseDto(); // Error Response
		CommonValidation validation = new CommonValidation(); // validation response

		if (validation.validateStringValues(request.getFirstName())) {
			response1.setResponseCode(EnumResponseCodes.ER102.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER102.getMessage() + " : " + request.getFirstName());
			log.error(response1);
			return response1;
		}
		if (!validation.validationString(request.getFirstName())) {

			response1.setResponseCode(EnumResponseCodes.ER107.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER107.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.lengthString(request.getFirstName())) {

			response1.setResponseCode(EnumResponseCodes.ER141.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER141.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.validationSpace(request.getFirstName())) {
			response1.setResponseCode(EnumResponseCodes.ER147.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER147.getMessage());
			log.error(response1);
			return response1;
		}

		if (validation.validateStringValues(request.getLastName())) {
			response1.setResponseCode(EnumResponseCodes.ER103.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER103.getMessage() + " : " + request.getLastName());
			log.error(response1);
			return response1;
		}
		if (!validation.validationString(request.getLastName())) {

			response1.setResponseCode(EnumResponseCodes.ER111.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER111.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.lengthString(request.getLastName())) {

			response1.setResponseCode(EnumResponseCodes.ER142.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER142.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.validationSpace(request.getLastName())) {
			response1.setResponseCode(EnumResponseCodes.ER148.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER148.getMessage());
			log.error(response1);
			return response1;
		}

		if (validation.validateStringValues(request.getEmailId())) {
			response1.setResponseCode(EnumResponseCodes.ER108.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER108.getMessage() + " : " + request.getEmailId());
			log.error(response1);
			return response1;
		}

		if (!validation.validateEmail(request.getEmailId())) {
			response1.setResponseCode(EnumResponseCodes.ER105.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER105.getMessage() + " : " + request.getEmailId());
			log.error(response1);
			return response1;
		}

		if (validation.validateStringValues(request.getContactNumber())) {
			response1.setResponseCode(EnumResponseCodes.ER113.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER113.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.validateNumber(request.getContactNumber())) {
			response1.setResponseCode(EnumResponseCodes.ER213.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER213.getMessage() + " : " + request.getContactNumber());
			log.error(response1);
			return response1;
		}
		if (validation.validateStringValues(request.getAlternateContactNumber())) {
			response1.setResponseCode(EnumResponseCodes.ER113.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER113.getMessage());
			log.error(response1);
			return response1;
		}
		if (!validation.validateNumber(request.getAlternateContactNumber())) {
			response1.setResponseCode(EnumResponseCodes.ER104.getCode());
			response1.setResponsemessage(
					EnumResponseCodes.ER104.getMessage() + " : " + request.getAlternateContactNumber());
			log.error(response1);
			return response1;
		}
		if (request.getContactNumber().equals(request.getAlternateContactNumber())) {
			response1.setResponseCode(EnumResponseCodes.ER589.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER589.getMessage());
			log.error(response1);
			return response1;

		}
		if (validation.validateStringValues(request.getCountry())) {
			response1.setResponseCode(EnumResponseCodes.ER112.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER112.getMessage());
			
			log.error(response1);
			return response1;
		}
		if (validation.validateStringValues(request.getAddress())) {
			response1.setResponseCode(EnumResponseCodes.ER114.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER114.getMessage());
			log.error(response1);
			return response1;
		}
		try {
			// Validating & allowing 3 file selected file pdf doc docx
			if (request.getFile().getOriginalFilename().contains(".pdf")
					|| request.getFile().getOriginalFilename().contains(".doc")
					|| request.getFile().getOriginalFilename().contains(".docx")) {
				log.info("Call Hiring Srvice" +request );
				response = hiringService.savedetails(request);
				String clientIp = requestService.getClientIp(request1);
				System.out.println("clientIp : "+ clientIp);
				idetails.setIp_address(clientIp);
				idetails.setRequest_Hit_date(new Date());
				idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.HIRING_ENDPOINT);
				iprepo.save(idetails);
			} else {
				// if you not selected 3 file selected file pdf doc docx
				response1.setResponseCode(EnumResponseCodes.ER209.getCode());
				response1.setResponsemessage(EnumResponseCodes.ER209.getMessage());
				return response1;
			}
		} catch (Exception e) {
			// An error occurred while processing hiring request
			log.error(e);
			response1.setResponseCode(EnumResponseCodes.ER500.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER500.getMessage());
			return response1;
		}
		return response;
	}
}