package com.website.service;

import java.util.List;

import com.website.Dto.DeveloperAndSkillsResponseDto;
import com.website.Dto.RequirementRequestDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.DeveloperAndSkillsModel;

public interface DeveloperAndSkillsService {

	public ErrorResponseDto saveDeveloperandSkills(DeveloperAndSkillsResponseDto developerandskillsDto);

	public List<DeveloperAndSkillsModel> findAll(RequirementRequestDto dto);
}
