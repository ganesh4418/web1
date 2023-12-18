package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ErrorResponseDto {
	String responseCode;
	String responsemessage;
	public static final String PDF = "ONLY_PDF_ACCEPTED";
}
