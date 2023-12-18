package com.website.serviceimpl;

import java.io.File;
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
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.website.Dto.HiringRequestDto;
import com.website.Dto.HiringResponseDto;
import com.website.Dto.ErrorResponseDto;
import com.website.model.HiringModel;
import com.website.repository.HiringRepository;
import com.website.service.EmailService;
import com.website.service.HiringService;
import com.website.util.EnumResponseCodes;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
@Transactional
public class HiringServiceImpl implements HiringService {
	@Autowired
	private HiringRepository hirerepo;
	@Autowired
	private EmailService emailservice;

	@Autowired
	private Configuration config;

	@Value("${spring.mail.username}")
	private String sender;

	@Value("${spring.mail.password}")
	private String password;

	@Value("${spring.mail.hr}")
	private String hr;

	@Value("${spring.servlet.multipart.location}")
	private String location;

	private static final Logger LOGGER = LoggerFactory.getLogger(HiringServiceImpl.class);

	@Override
	public Object savedetails(HiringRequestDto request) {
		HiringModel hiring = null;
		HiringResponseDto response = new HiringResponseDto();
		LOGGER.info("Employee Hiring  Details {} ", request);
		ErrorResponseDto response1 = new ErrorResponseDto();
		
		hiring = new HiringModel();
		UUID referanceKey = UUID.randomUUID();
		hiring.setReferanceKey(referanceKey);
		hiring.setFirstName(request.getFirstName());
		hiring.setLastName(request.getLastName());
		hiring.setEmailId(request.getEmailId());
		hiring.setContactNumber(request.getContactNumber());
		hiring.setAlternateContactNumber(request.getAlternateContactNumber());
		hiring.setAddress(request.getAddress());
		hiring.setWorkLink(request.getWorkLink());
		hiring.setCountry(request.getCountry());
		hiring.setFileName(request.getFile().getOriginalFilename());

		try {
			hiring = hirerepo.save(hiring);
			response.setCode(EnumResponseCodes.S208.getCode());
			response.setMessage(EnumResponseCodes.S208.getMessage());
			response.setReferenceKey(referanceKey);
			response.setEmail(request.getEmailId());
		} catch (Exception e) {
			LOGGER.error("hiring  details are not saved in service layer request {} ", e);
			response1.setResponseCode(EnumResponseCodes.ER501.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER501.getMessage());
			return response1;

		}
			LOGGER.info("Employee Hiring Details {}", request);
			Properties props = new Properties();
			Session session = Session.getInstance(props, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(sender, password);
				}
			});
			MimeMessage mailMessage = new MimeMessage(session);
			// set mediaType
			MimeMessageHelper helper;
			try {
				helper = new MimeMessageHelper(mailMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
						StandardCharsets.UTF_8.name());

				// add attachment
				helper.addAttachment(request.getFile().getOriginalFilename(), request.getFile());
				String fileName = request.getFile().getOriginalFilename();
				//request.getFile().transferTo(new File(location +"HiringDoc/" + fileName));
				request.getFile().transferTo(new File(location + fileName));
				Map<String, Object> model = new HashMap<>();
				model.put("hireDto1", request);

				Template t = config.getTemplate("email-template-hiring.html");
				String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
				// sending mail to user
				helper.setTo(request.getEmailId());
				helper.setFrom(sender);
				helper.setText("You have applied Succesfully!!");
				helper.setSubject("You  have applied Succesfully!!");
        		emailservice.sendEmail(mailMessage);
				// sending mail to HR
				helper.setTo(hr);
				helper.setFrom(sender);
				helper.setText(html, true);
				helper.setSubject("Candidate Details!!");
				emailservice.sendEmail(mailMessage);
			} catch (MessagingException | IOException | TemplateException e) {
				LOGGER.error("In template,if any missing field then error displays for Hiring{}", e);
				response1.setResponseCode(EnumResponseCodes.ER508.getCode());
				response1.setResponsemessage(EnumResponseCodes.ER508.getMessage() + e.getMessage());
				return response1;
			}

		return response;
	}
}