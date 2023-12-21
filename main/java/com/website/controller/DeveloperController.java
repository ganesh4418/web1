package com.website.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.website.Dto.DeveloperAndSkillsResponseDto;
import com.website.Dto.RequirementRequestDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.DeveloperAndSkillsModel;
import com.website.model.IpDetails;
import com.website.repository.IpRepository;
import com.website.service.DeveloperAndSkillsService;
import com.website.service.RequestService;
import com.website.util.CommonValidation;
import com.website.util.EnumResponseCodes;
import com.website.util.commonConstants;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DeveloperController {

	@Autowired
	private DeveloperAndSkillsService developerService;
	@Autowired
	private RequestService requestService;
	@Autowired
	private IpRepository iprepo;


	private static final Logger LOGGER = LoggerFactory.getLogger(DeveloperController.class);

	// Developer And Skills api to save the given required fields
	@PostMapping(value = "/DeveloperAndSkills")
	public ErrorResponseDto saveDeails(@RequestBody DeveloperAndSkillsResponseDto request,HttpServletRequest request1) {
		IpDetails idetails=new IpDetails();
		LOGGER.info("In DeveloperServiceImpl request saveDetails " + request);
		ErrorResponseDto response = new ErrorResponseDto(); // for Response with code and message
		CommonValidation validation = new CommonValidation();// for validation of given fields

		if (validation.validateStringValues(request.getDesignation())) {
			response.setResponseCode(EnumResponseCodes.ER503.getCode());
			response.setResponsemessage(EnumResponseCodes.ER503.getMessage());
			return response;
		}
		if (!validation.validationString(request.getDesignation())) {
			response.setResponseCode(EnumResponseCodes.ER132.getCode());
			response.setResponsemessage(EnumResponseCodes.ER132.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getSkills())) {
			response.setResponseCode(EnumResponseCodes.ER504.getCode());
			response.setResponsemessage(EnumResponseCodes.ER504.getMessage());
			return response;
		}
		if (!validation.validationString(request.getSkills())) {
			response.setResponseCode(EnumResponseCodes.ER133.getCode());
			response.setResponsemessage(EnumResponseCodes.ER133.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getLocation())) {
			response.setResponseCode(EnumResponseCodes.ER505.getCode());
			response.setResponsemessage(EnumResponseCodes.ER505.getMessage());
			return response;
		}
		if (!validation.validationString(request.getLocation())) {
			response.setResponseCode(EnumResponseCodes.ER118.getCode());
			response.setResponsemessage(EnumResponseCodes.ER118.getMessage());
			return response;
		}
		if (!validation.validationString(request.getAvailibility())) {
			response.setResponseCode(EnumResponseCodes.ER150.getCode());
			response.setResponsemessage(EnumResponseCodes.ER150.getMessage());
			return response;
		}
		if (validation.validateStringValues(request.getAvailibility())) {
			response.setResponseCode(EnumResponseCodes.ER506.getCode());
			response.setResponsemessage(EnumResponseCodes.ER506.getMessage());
			return response;
		} else {
			// if the given method is save then will display the save message
			developerService.saveDeveloperandSkills(request);
			String clientIp = requestService.getClientIp(request1);
			System.out.println("clientIp : "+ clientIp);
			idetails.setIp_address(clientIp);
			idetails.setRequest_Hit_date(new Date());
			idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.DEVELOPER_AND_SKILLS_ENDPOINT);
			iprepo.save(idetails);
			response.setResponseCode(EnumResponseCodes.S209.getCode());
			response.setResponsemessage(EnumResponseCodes.S209.getMessage());
		}
		return response;
	}

	@PostMapping("/requirementSearch")
	public ResponseEntity<Object> searchPlants(@RequestBody RequirementRequestDto request,HttpServletRequest request1) {
		ErrorResponseDto response = new ErrorResponseDto();
		IpDetails idetails=new IpDetails();
		LOGGER.info("Developer Requirement Skill List " + request);
		List<DeveloperAndSkillsModel> details = developerService.findAll(request);
		System.out.println(details);
		String clientIp = requestService.getClientIp(request1);
		System.out.println("clientIp : "+ clientIp);
		idetails.setIp_address(clientIp);
		idetails.setRequest_Hit_date(new Date());
		idetails.setRequest(commonConstants.BASE_URL+"/"+commonConstants.REQUIREMENT_SEARCH_ENDPOINT);
		iprepo.save(idetails);
		if (!details.isEmpty()) {

			return ResponseEntity.ok().body(details);
		}

		else {
			LOGGER.error("Required list is not available" + request);
			response.setResponseCode(EnumResponseCodes.ER507.getCode());
			response.setResponsemessage(EnumResponseCodes.ER507.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
}