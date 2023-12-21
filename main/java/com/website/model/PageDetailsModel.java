package com.website.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "PageDetails")
@Getter
@Setter
@ToString

@AllArgsConstructor
@NoArgsConstructor
public class PageDetailsModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(length = 100000)
	private String pageUrl;
	@Column(length = 100000)
	private String pageTitle;
	@Column(length = 100000)
	private String description;

}
