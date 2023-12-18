package com.website.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class SubmitYourIdeaModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	public String fullName;
	private UUID referanceKey;
	public String country;
	public String emailAddress;
	public String contactNumber;
	public String alternateContactNumber;
	public String domain;
	public String ideaStage;
	public String describeYourIdea;
	public String attachmentName;
	public String organisationName;
	public String subject;

}
