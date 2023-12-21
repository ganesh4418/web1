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

@Data
@ToString
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleMeetingModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private int id;
	private String firstName;
	private String lastName;
	private UUID referanceKey;
	private String country;
	private String email;
	private String contactNumber;
	private String briefForTheMeeting;
	private String meetingUrl;
	private String selectMeetingMode;
	private String date;
	private String time;
}
