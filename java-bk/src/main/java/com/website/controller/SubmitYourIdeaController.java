package com.website.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.ErrorResponseDto;
import com.website.Dto.SubmitYourIdeaRequestDto;
import com.website.Dto.SubmitYourIdeaResponseDto;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.repository.SubmitYourIdeaRepository;
import com.website.service.RequestService;
import com.website.service.SubmitYourIdeaService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") // for Front end purpose
@Log4j
public class SubmitYourIdeaController {
	@Autowired
	public SubmitYourIdeaService submitYourIdeaService;

	@Autowired
	public SubmitYourIdeaRepository submitYourIdeaRepository;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;

	//private static final Logger LOGGER = LogManager.getLogger(SubmitYourIdeaController.class);

	@PostMapping(value = "/submitYourIdea", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public Object createIdea(SubmitYourIdeaRequestDto request,HttpServletRequest request1) {
		IpDetails idetails=new IpDetails();
		log.info("In SubmitYourIdeaService request to createIdea :{}" + request);
		log.debug("In SubmitYourIdeaService request to createIdea " + request);
		Object response1 = new SubmitYourIdeaResponseDto();
		CommonValidation validation = new CommonValidation(); // For Validation
		ErrorResponseDto response = new ErrorResponseDto(); // for Response with code and message

		if (validation.validateStringValues(request.getFullName())) {
			response.setResponseCode(EnumResponseCodes.ER137.getCode());
			response.setResponsemessage(EnumResponseCodes.ER137.getMessage() + " : " + request.getFullName());
			log.error(response);
			return response;
		}
		if (!validation.validationString(request.getFullName())) {

			response.setResponseCode(EnumResponseCodes.ER121.getCode());
			response.setResponsemessage(EnumResponseCodes.ER121.getMessage());
			log.error(response);
			return response;
		}
		if (!validation.lengthString(request.getFullName())) {

			response.setResponseCode(EnumResponseCodes.ER146.getCode());
			response.setResponsemessage(EnumResponseCodes.ER146.getMessage());
			log.error(response);
			return response;
		}

		if (validation.validateStringValues(request.getEmailAddress())) {
			response.setResponseCode(EnumResponseCodes.ER108.getCode());
			response.setResponsemessage(EnumResponseCodes.ER108.getMessage() + " : " + request.getEmailAddress());
			log.error(response);
			return response;
		}
		if (!validation.validateEmail(request.getEmailAddress())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER105.getCode());
			response.setResponsemessage(EnumResponseCodes.ER105.getMessage() + " : " + request.getEmailAddress());
			return response;
		}

		if (!validation.validateNumber(request.getContactNumber())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER104.getCode());
			response.setResponsemessage(EnumResponseCodes.ER104.getMessage() + " : " + request.getContactNumber());
			return response;
		}
		if (validation.validateStringValues(request.getContactNumber())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER113.getCode());
			response.setResponsemessage(EnumResponseCodes.ER113.getMessage());
			return response;
		}
		if (!validation.validateNumber(request.getAlternateContactNumber())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER104.getCode());
			response.setResponsemessage(
					EnumResponseCodes.ER104.getMessage() + " : " + request.getAlternateContactNumber());
			return response1;
		}
		if (validation.validateStringValues(request.getAlternateContactNumber())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER113.getCode());
			response.setResponsemessage(EnumResponseCodes.ER113.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getCountry())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER112.getCode());
			response.setResponsemessage(EnumResponseCodes.ER112.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getOrganisationName())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER122.getCode());
			response.setResponsemessage(EnumResponseCodes.ER122.getMessage());
			return response;
		}
		if (!validation.validationString(request.getOrganisationName())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER123.getCode());
			response.setResponsemessage(EnumResponseCodes.ER123.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getSubject())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER124.getCode());
			response.setResponsemessage(EnumResponseCodes.ER124.getMessage());
			return response;
		}
		if (request.getContactNumber().equals(request.getAlternateContactNumber())) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER589.getCode());
			response.setResponsemessage(EnumResponseCodes.ER589.getMessage());
			return response;

		}
		// ADD Attachment in PDF/DOC/DOCX format only
//			if (dto.getAttachmentUpload().getOriginalFilename().contains(".pdf") || dto.getAttachmentUpload().getOriginalFilename().contains(".doc") || dto.getAttachmentUpload().getOriginalFilename().contains(".docx")) {
//				submitYourIdeaService.createIdea(dto);
//				LOGGER.info("Your idea submitted successfully {}"+dto);
//				response.setResponseCode(ResponseCodes.S212.getCode());
//				response.setResponsemessage(ResponseCodes.S212.getMessage());
//				return response;
//			}
//			else { // message for upload attachment
//				LOGGER.error("Please Upload attachment"+dto);
//				response.setResponseCode(ResponseCodes.ER215.getCode());
//				response.setResponsemessage(ResponseCodes.ER215.getMessage());	
//				return response;
//				}

		// message for upload attachment
		if (request.getAttachmentUpload().getOriginalFilename().isEmpty()) {
			log.error(response);
			response.setResponseCode(EnumResponseCodes.ER515.getCode());
			response.setResponsemessage(EnumResponseCodes.ER515.getMessage());
			return response;
		}
		try {
			response1 = submitYourIdeaService.createIdea(request);
			log.info("Your idea submitted successfully {}" + request);
			String clientIp = requestService.getClientIp(request1);
			System.out.println("clientIp : "+ clientIp);
			idetails.setIp_address(clientIp);
			idetails.setRequest_Hit_date(new Date());
			idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.SUBMIT_YOU_IDEA_ENDPOINT);
			iprepo.save(idetails);

		} catch (Exception e) {
			log.error(" SubmitYourIdeaServiceImpl request to createIdea:" + request);
			response.setResponseCode(EnumResponseCodes.ER514.getCode());
			response.setResponsemessage(EnumResponseCodes.ER514.getMessage());
			return response;
		}
		return response1;
	}
}
