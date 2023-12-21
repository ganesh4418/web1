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

import com.website.Dto.BeautoSiteRequestDto;
import com.website.Dto.BeautoSiteResponseDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.BeautoSiteModel;
import com.website.repository.BeautoSiteRepository;
import com.website.service.BeautoSiteService;
import com.website.service.EmailService;
import com.website.util.EnumResponseCodes;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
@Transactional
public class BeautoSiteServiceImpl implements BeautoSiteService {
	@Autowired
	private BeautoSiteRepository repository;
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
	public Object createBeautoSite(BeautoSiteRequestDto request) {
		BeautoSiteModel entity = null;
		ErrorResponseDto errorResponseDto = new ErrorResponseDto();
		BeautoSiteResponseDto response = new BeautoSiteResponseDto();

		entity = new BeautoSiteModel();
		entity.setFirstName(request.getFirstName());
		entity.setLastName(request.getLastName());
		UUID referanceKey = UUID.randomUUID();
		entity.setReferanceKey(referanceKey);
		entity.setEmail(request.getEmail());
		entity.setContactNumber(request.getContactNumber());
		entity.setBriefForTheMeeting(request.getBriefForTheMeeting());
		entity.setCountry(request.getCountry());

		try {

			repository.save(entity);
			response.setCode(EnumResponseCodes.S202.getCode());
			response.setMessage(EnumResponseCodes.S202.getMessage());
			response.setReferenceKey(referanceKey);
			response.setEmail(request.getEmail());

			Properties props = new Properties();
			Session session1 = Session.getInstance(props, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(sender, password);
				}
			});
			MimeMessage mailMessage = new MimeMessage(session1);
			MimeMessageHelper helper; // set mediaType

			helper = new MimeMessageHelper(mailMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			Map<String, Object> model = new HashMap<>();// add attachment
			model.put("Dto1", request);

			Template t2 = config.getTemplate("email-template-write-us.html");
			String html2 = FreeMarkerTemplateUtils.processTemplateIntoString(t2, model);

			helper.setTo(request.getEmail());
			helper.setFrom(sender);
			helper.setText(html2, true);
			helper.setSubject("Meeting Details");
			emailService.sendEmail(mailMessage);
			helper.setTo(business);
			helper.setFrom(sender);
			helper.setText(html2, true);
			helper.setSubject("Meeting Details");
			emailService.sendEmail(mailMessage);

		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error(" In template,if any missing field then error displays for BeautesiteServiceImpl: {} ");
			errorResponseDto.setResponseCode(EnumResponseCodes.ER508.getCode());
			errorResponseDto.setResponsemessage(EnumResponseCodes.ER508.getMessage() + e.getMessage());
			return errorResponseDto;
		}
		return response;
	}
}