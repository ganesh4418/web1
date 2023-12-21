package com.website.service;

import com.website.Dto.SubmitYourIdeaRequestDto;
import com.website.Dto.SubmitYourIdeaResponseDto;

public interface SubmitYourIdeaService {

	Object createIdea(SubmitYourIdeaRequestDto dto);

}
