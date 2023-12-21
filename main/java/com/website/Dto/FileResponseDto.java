package com.website.Dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class FileResponseDto {
	private String name;
	private String url;
	private String type;
	private long size;

	public FileResponseDto(String name, String url, String type, long size) {
		this.name = name;
		this.url = url;
		this.type = type;
		this.size = size;
	}

}
