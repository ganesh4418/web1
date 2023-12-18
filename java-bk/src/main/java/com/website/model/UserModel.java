package com.website.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String organizationName;
	private String mailId;
	private String description;
	private String buildedTeam;

}
