package com.website.Dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SubmitYourIdeaRequestDto {

	public String fullName;
	public String country;
	public String emailAddress;
	public String contactNumber;
	public String alternateContactNumber;
	public String domain;
	public String ideaStage;
	public String describeYourIdea;
	public MultipartFile attachmentUpload;
	public String organisationName;
	public String subject;
}
