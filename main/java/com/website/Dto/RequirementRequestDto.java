package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RequirementRequestDto {
	private String requirement;
	private String fullFilment;
	private String teamBucket;
}
