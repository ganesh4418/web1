package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class DeveloperAndSkillsResponseDto {
	private int id;
	private String designation;
	private String skills;
	private String location;
	private String availibility;
}
