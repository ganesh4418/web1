package com.website.Dto;

import java.util.UUID;

import lombok.Data;
import lombok.ToString;
@Data
@ToString
public class BeautoSiteResponseDto {
	private String code;
	private String message;
	private UUID referenceKey;
	private String email;

}
