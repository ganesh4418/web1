package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class BeautoSiteRequestDto {
	private int id;
	private String firstName;
	private String lastName;
	private String country;
	private String email;
	private String contactNumber;
	private String briefForTheMeeting;
}
