	package com.website.serviceimpl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.website.Dto.BeautoSiteResponseDto;
import com.website.Dto.ErrorResponseDto;
import com.website.Dto.ScheduleMeetingRequestDto;
import com.website.model.ScheduleMeetingModel;
import com.website.repository.ScheduleMeetingRepository;
import com.website.service.EmailService;
import com.website.service.ScheduleMeetingService;
import com.website.util.EnumResponseCodes;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
@Service
@Transactional
public class ScheduleMeetingServiceImpl implements ScheduleMeetingService {
	@Autowired
	private ScheduleMeetingRepository scheduleMeetingRepo;
	@Autowired
	private EmailService emailService;
	@Autowired
	private Configuration config;

	@Value("${spring.mail.username}")
	private String sender;

	@Value("${spring.mail.password}")
	private String password;

	@Value("${spring.mail.business}")
	private String business;

	@Value("${spring.mail.meetingUrl}")
	private String meetingUrl;

	private static final Logger LOGGER = LoggerFactory.getLogger(BeautoSiteServiceImpl.class);

	@Override
	public Object createScheduleMeeting(ScheduleMeetingRequestDto request) {
		LOGGER.info("welcome on server side: " + request);
		ScheduleMeetingModel scheduleMeeting = null;
		BeautoSiteResponseDto response= new BeautoSiteResponseDto();
		ErrorResponseDto response1 = new ErrorResponseDto();
		
		scheduleMeeting = new ScheduleMeetingModel();
		scheduleMeeting.setFirstName(request.getFirstName());
		scheduleMeeting.setLastName(request.getLastName());
		UUID referanceKey = UUID.randomUUID();
		scheduleMeeting.setReferanceKey(referanceKey);
		scheduleMeeting.setEmail(request.getEmail());
		scheduleMeeting.setContactNumber(request.getContactNumber());
		scheduleMeeting.setBriefForTheMeeting(request.getBriefForTheMeeting());
		scheduleMeeting.setSelectMeetingMode(request.getSelectMeetingMode());
		scheduleMeeting.setDate(request.getDate());
		scheduleMeeting.setCountry(request.getCountry());
		scheduleMeeting.setTime(request.getTime());

		try {
			scheduleMeetingRepo.save(scheduleMeeting);
			response.setCode	(EnumResponseCodes.S201.getCode());
			response.setMessage(EnumResponseCodes.S201.getMessage());
			response.setReferenceKey(referanceKey);
			response.setEmail(request.getEmail());
			
		} catch (Exception e) {
			LOGGER.error(" Data not accepted in service layer ScheduleMeeting ");
			response1.setResponseCode(EnumResponseCodes.ER212.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER212.getMessage());
			return response1;
		}

		Properties props = new Properties();
		Session session1 = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(sender, password);
			}
		});
		MimeMessage mailMessage = new MimeMessage(session1);
		MimeMessageHelper helper; // set mediaType
		try {
			helper = new MimeMessageHelper(mailMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			Map<String, Object> model = new HashMap<>();// add attachment
			model.put("Dto1", request);
			request.setMeetingUrl(meetingUrl);
			Template t1 = config.getTemplate("email-template-meeting-online.html");
			String html1 = FreeMarkerTemplateUtils.processTemplateIntoString(t1, model);

			Template t2 = config.getTemplate("email-template-meeting-offline.html");
			String html2 = FreeMarkerTemplateUtils.processTemplateIntoString(t2, model);

			if (request.getSelectMeetingMode().equalsIgnoreCase("Online")) {
				helper.setText(html1, true);
				response.setCode	(EnumResponseCodes.S201.getCode());
				response.setMessage(EnumResponseCodes.S201.getMessage());
				response.setReferenceKey(referanceKey);
				response.setEmail(request.getEmail());
				
			} else {
				helper.setText(html2, true);
				response.setCode(EnumResponseCodes.S202.getCode());
				response.setMessage(EnumResponseCodes.S202.getMessage());
				response.setReferenceKey(referanceKey);
				response.setEmail(request.getEmail());	
			}

			helper.setTo(new String[]{business, request.getEmail()});
			helper.setFrom(sender);
			helper.setSubject("Meeting Details");
			emailService.sendEmail(mailMessage);

		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error(" In template,if any field is missing then displays error for ScheduleMeeting ");
			response1.setResponseCode(EnumResponseCodes.ER508.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER508.getMessage()+ e.getMessage());
			return response1;
		}
		return response;
	}
}