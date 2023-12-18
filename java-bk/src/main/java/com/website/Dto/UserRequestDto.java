package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserRequestDto {

	private int id;
	private String organizationName;
	private String mailId;
	private String description;
	private String buildedTeam;

}
