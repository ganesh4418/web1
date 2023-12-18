package com.website.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class HiringModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private UUID referanceKey;
	private String firstName;
	private String lastName;
	private String country;
	private String emailId;
	private String contactNumber;
	private String alternateContactNumber;
	private String address;
	private String workLink;
	private String fileName;

}