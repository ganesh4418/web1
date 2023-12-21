package com.website.Dto;

import java.util.UUID;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class HiringResponseDto {
	private String code;
	private String message;
	private UUID referenceKey;
	private String email;
	public static final String PDF = "ONLY_PDF_ACCEPTED";

	public static String getPdf() {
		return PDF;
	}
}
