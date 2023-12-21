package com.website.Dto;

import javax.persistence.Entity;
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
public class ScheduleMeetingRequestDto {
	
	private int id;
	private String firstName;
	private String lastName;
	private String country;
	private String email;
	private String contactNumber;
	private String briefForTheMeeting;
	private String meetingUrl;
	private String selectMeetingMode;
	private String date;
	private String time;
}