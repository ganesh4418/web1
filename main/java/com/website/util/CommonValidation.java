package com.website.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommonValidation {

	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
		.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
	
	public boolean validateEmail(String emailStr) {
		if (emailStr != null && emailStr.trim() != null && !emailStr.trim().replace(" ", "").isEmpty() && emailStr.contains("gmail.com")) {
			if (emailStr != null) {
				Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
				return matcher.find();
			}
		}
		return false;
	}

	public boolean validateNumber(String num) {
		boolean validateResult = false;

		if (num != null && num.trim() != null && !num.trim().replace(" ", "").isEmpty()) {
			String regex = "[0-9+]{6,15}";
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(num);
			if (matcher.matches()) {
				validateResult = true;
			}
		}
		return validateResult;
	}

	public boolean validateStringValues(String reqParamValue) {
		boolean validateResult = false;
		if (reqParamValue == null || reqParamValue.trim() == null || reqParamValue.trim().replace(" ", "").isEmpty()
				|| reqParamValue.equalsIgnoreCase("null") )
			validateResult = true;
		return validateResult;
	}

	public boolean validationString(String name) {
		boolean validateResult = false;

			String regex = "^[a-z A-Z]+$";
			
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(name);
			if (matcher.matches()) {
				validateResult = true;
			}

		return validateResult;
	}
	
	public boolean lengthString(String name) {
		boolean validateResult = false;
		if (name != null && name.trim() != null && (name.length() >= 2 && name.length() <= 24)) 
		 validateResult=true;
		return validateResult;
	}
	public boolean maxString(String name) {
		boolean validateResult = false;
		if (name != null && name.trim() != null && (name.length() <= 16)) 
		 validateResult=true;
		return validateResult;
	}
	
	public boolean validationSpace(String name) {
		boolean validateResult = false;
		if (name != null && name.trim() != null ) {
			String regex = "^[a-zA-Z]+$";
			
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(name);
			if (matcher.matches()) {
				validateResult = true;
			}}
	
		return validateResult;
	}
}