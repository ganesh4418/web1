package com.website.util;

public enum EnumResponseCodes {
	S200("S200", "Details Added Successfully"),
	S201("S201", "Details Added Successfully & Meeting link sent to your email"),
	S202("S202", "Details Added Successfully & Meeting details sent to your email"),
	S205("S205", "Updated password Successfully"), 
	S208("S208", "File uploaded Successfully"),
	S209("S209", "DeveloperAndskills request saved successfully"), 
	S210("S210", "Requirement is available"),
	S211("S211", "Your idea submitted successfully"),

	ER102("ER102", "First name shouldn't be null or blank"),
	ER112("ER112", "Country shouldn't be null or blank"),
	ER114("ER114", "Address shouldn't be null or blank"),
	ER115("ER115", "Brief for the meeting  shouldn't be null or blank"),
	ER116("ER116", "Designation shouldn't contain special character & numbers "),
	ER117("ER117", "Skills shouldn't contain special character & numbers "),
	ER118("ER118", "Location shouldn't contain special character & numbers "),
	ER119("ER119", "Location shouldn't contain special character & numbers "),
	ER128("ER128", "Invalid Email Address"),
	ER150("ER150", "Availability shouldn't contain special character & numbers "),
	ER141("ER141", "First name accepts minumun two characters "),
	ER142("ER142", "last name accepts minumun two characters "),
	ER145("ER145", "Fullname accepts minumun two characters & maximum 16"),
	ER146("ER146", "Fullname accepts minumun two characters & maximum 16 "),
	ER147("ER147", "firstName won't accept spaces"),
	ER148("ER148", "LastName won't accept spaces"),
	ER122("ER122", "Organization shouldn't be null or blank"),
	ER123("ER123", "Organization shouldn't contains special character & numbers "),
	ER124("ER124", "subject shouldn't be null or blank"),
	ER120("ER120", "date shouldn't be null or blank"),
	ER125("ER125", "date shouldn't be null or blank"),
	ER137("ER137", "FullName name shouldn't be null or blank"),
	ER121("ER121", "Full name shouldn't contain special character & numbers "),
	ER107("ER107", "First name shouldn't contain special character & numbers "),
	ER111("ER111", "Last name shouldn't contain special character & numbers "),
	ER103("ER103", "Last name shouldn't be null or blank"),
	ER104("ER104", "Invalid phone number"),
	ER113("ER113", "Alternate contact Number shouldn't be null or blank"),
	ER213("ER213", "Contact Number shouldn't be null or blank"),
	ER129("ER129", "Description shouldn't be null or blank"),
	ER130("ER130", "Description shouldn't contain special character & numbers "),
	ER131("ER131", "Builded Team shouldn't contain special character & numbers "),
	ER132("ER132", "Designation shouldn't contain special character & numbers "),
	ER133("ER133", "Skills shouldn't contain special character & numbers "),
	ER105("ER105", "Invalid Email Address"),
	ER106("ER106","Failed to save meeting details"),
	ER108("ER108", "Email Address shouldn't be null or blank"), 
	ER209("ER209", "Please Upload file: pdf/doc/docx"),
	ER212("ER212", "ScheduleMeeting details are not Submitted"),
	ER500("ER500", "Hiring request is not saved"), 
	ER501("ER501", "Failed to process request"),
	ER495("ER495", "File not uploaded in hiring request"), 
	ER502("ER502", "DeveloperAndskills request is not saved"),
	ER503("ER503", "Designation shouldn't be null or blank"), 
	ER504("ER504", "Skills shouldn't be null or blank"),
	ER505("ER505", "Location shouldn't be null or blank"),
	ER506("ER506", "Availability shouldn't be null or blank"),
	ER507("ER507", "Sorry, we could not find a suitable team based on your requirements. Please provide more specific information"),
	ER508("ER508", "Failed in service layer sending email template"), 
	ER509("ER509", "Failed to reach service layer"),
	ER514("ER514", "Your Idea  is not Submitted"), 
	ER515("ER515", "Please Upload attachment"),
	ER516("ER516", "Mail not sent"), 
	ER517("ER517", "Exception while Sending mail with template"),
	ER589("ER589", "Contact Number & alternate contact number shouldn't be same");

	private String code;
	private String message;

	private EnumResponseCodes(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}