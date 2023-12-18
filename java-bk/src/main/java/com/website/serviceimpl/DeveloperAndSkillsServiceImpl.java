package com.website.serviceimpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.website.Dto.DeveloperAndSkillsResponseDto;
import com.website.Dto.RequirementRequestDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.DeveloperAndSkillsModel;
import com.website.model.RequirementModel;
import com.website.repository.DeveloperAndSkillsRepository;
import com.website.repository.RequirementRepository;
import com.website.service.DeveloperAndSkillsService;
import com.website.util.EnumResponseCodes;

import info.debatty.java.stringsimilarity.Cosine;

@Service
@Transactional
public class DeveloperAndSkillsServiceImpl implements DeveloperAndSkillsService {
	@Autowired
	private DeveloperAndSkillsRepository developerRepo;

	@Autowired
	private RequirementRepository requirementRepo;
	private static final Logger LOGGER = LoggerFactory.getLogger(DeveloperAndSkillsServiceImpl.class);

	@Override
	public ErrorResponseDto saveDeveloperandSkills(DeveloperAndSkillsResponseDto request) {

		LOGGER.info("Developer and Skills Details =============> {} ");
		DeveloperAndSkillsModel model = null;
		ErrorResponseDto response = new ErrorResponseDto();

		model =new DeveloperAndSkillsModel();
		model.setDesignation(request.getDesignation());
		model.setSkills(request.getSkills());
		model.setAvailibility(request.getAvailibility());
		model.setLocation(request.getLocation());
		try {
			developerRepo.save(model);

		} catch (Exception e) {
			LOGGER.error(" Developer and Skills Details are not save ===============> {} ", e);
			response.setResponseCode(EnumResponseCodes.ER502.getCode());
			response.setResponsemessage(EnumResponseCodes.ER502.getMessage());
		}
		return response;
	}

	public List<DeveloperAndSkillsModel> findAll(RequirementRequestDto request) {
		LOGGER.info("Developer and Skills Details ===============> {} ");
		Cosine cosine = new Cosine(2);
		List<DeveloperAndSkillsModel> deviceOrganizationDtoList = new ArrayList<DeveloperAndSkillsModel>();
		List<DeveloperAndSkillsModel> details = developerRepo.findAll();
		List<String> list = new ArrayList<String>();
		for (DeveloperAndSkillsModel developerandskills : details) {
			if (cosine.similarity(request.getRequirement(), developerandskills.getSkills()) > 0.1) {
				deviceOrganizationDtoList.add(developerandskills);
			}
			System.out.println(deviceOrganizationDtoList);

		}
		if (!deviceOrganizationDtoList.isEmpty()) {
			for (DeveloperAndSkillsModel das : deviceOrganizationDtoList) {
				list.add(das.getDesignation());

			}
			RequirementModel require = new RequirementModel();
			String commaSeparatedString = String.join(",", list);
			require.setRequirement(request.getRequirement());
			require.setDate(new Date());
			require.setFullFilment(request.getFullFilment());
			require.setTeamBucket(request.getTeamBucket());
			require.setTeamSuggested(commaSeparatedString);
			requirementRepo.save(require);
			System.out.println(list);

		} else {
			RequirementModel require = new RequirementModel();
			require.setDate(new Date());
			require.setRequirement(request.getRequirement());

			requirementRepo.save(require);
			System.out.println(list);
		}
		return deviceOrganizationDtoList;
	}
}
