package com.website.Dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class HiringRequestDto {
	private int id;
	private String firstName;
	private String lastName;
	private String country;
	private String emailId;
	private String contactNumber;
	private String alternateContactNumber;
	private String address;
	private String workLink;
	private MultipartFile file;

}