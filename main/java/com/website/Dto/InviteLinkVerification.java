package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class InviteLinkVerification {
	private ErrorResponseDto response;
	private String UUID;
}