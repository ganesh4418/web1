
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

import com.website.Dto.ErrorResponseDto;
import com.website.Dto.SubmitYourIdeaRequestDto;
import com.website.Dto.SubmitYourIdeaResponseDto;
import com.website.model.SubmitYourIdeaModel;
import com.website.repository.SubmitYourIdeaRepository;
import com.website.service.EmailService;
import com.website.service.SubmitYourIdeaService;
import com.website.util.EnumResponseCodes;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
@Transactional
public class SubmitYourIdeaServiceImpl implements SubmitYourIdeaService {

	@Autowired
	SubmitYourIdeaRepository submitYourIdeaRepository;
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

	@Value("${spring.mail.design}")
	private String design;

	@Value("${spring.mail.mechanical}")
	private String mechanical;

	@Value("${spring.mail.software}")
	private String software;

	@Value("${spring.mail.Quro}")
	private String quro;

	@Value("${spring.servlet.multipart.location}")
	private String path;

	private static final Logger LOGGER = LoggerFactory.getLogger(SubmitYourIdeaServiceImpl.class);

	public Object createIdea(SubmitYourIdeaRequestDto request) {
		LOGGER.info("Submit Your Idea Details ==========> {}", request);
		SubmitYourIdeaModel model = null;
		SubmitYourIdeaResponseDto response = new SubmitYourIdeaResponseDto();
		ErrorResponseDto response1 = new ErrorResponseDto();

		model = new SubmitYourIdeaModel();
		model.setFullName(request.getFullName());
		UUID referanceKey = UUID.randomUUID();
		model.setReferanceKey(referanceKey);
		model.setCountry(request.getCountry());
		model.setEmailAddress(request.getEmailAddress());
		model.setContactNumber(request.getContactNumber());
		model.setAlternateContactNumber(request.getAlternateContactNumber());
		model.setDomain(request.getDomain());
		model.setIdeaStage(request.getIdeaStage());
		model.setDescribeYourIdea(request.getDescribeYourIdea());
		model.setAttachmentName(request.getAttachmentUpload().getOriginalFilename());
		model.setOrganisationName(request.getOrganisationName());
		model.setSubject(request.getSubject());
		try {
			model = submitYourIdeaRepository.save(model);
			response.setCode(EnumResponseCodes.S211.getCode());
			response.setMessage(EnumResponseCodes.S211.getMessage());
			response.setReferenceKey(referanceKey);
			response.setEmail(request.getEmailAddress());

		} catch (Exception e) {
			LOGGER.error(" submit your idea request is not save in save method:");
			response1.setResponseCode(EnumResponseCodes.ER514.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER514.getMessage());
			return response1;
		}

		LOGGER.info("In SubmitYourIdeaServiceImpl =========> {}", request);
		Properties props = new Properties();
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(sender, password);
			}
		});
		MimeMessage mailMessage = new MimeMessage(session);
		try {
			// set mediaType
			MimeMessageHelper helper = new MimeMessageHelper(mailMessage,
					MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
			// Need to check that syntax
			helper.addAttachment(request.getAttachmentUpload().getOriginalFilename(), request.getAttachmentUpload());
			String fileName = request.getAttachmentUpload().getOriginalFilename();
			request.getAttachmentUpload().transferTo(new File( path +  fileName));
		
			Map<String, Object> model1 = new HashMap<>();
			model1.put("dto1", request);
			Template t = config.getTemplate("email-template-idea.html");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model1);
			// Sending mail to selected Domain
			String selectedDomain = request.getDomain();

			if (selectedDomain.equalsIgnoreCase("Mechanical")) {
				helper.setTo(new String[] { request.getEmailAddress(), mechanical });
			}
			if (selectedDomain.equalsIgnoreCase("Design")) {
				helper.setTo(new String[] { request.getEmailAddress(), design });
			}
			if (selectedDomain.equalsIgnoreCase("Software")) {
				helper.setTo(new String[] { request.getEmailAddress(), software });
			}
			if (selectedDomain.equalsIgnoreCase("Quro")) {
				helper.setTo(new String[] { request.getEmailAddress(), quro });
			}
			if (selectedDomain.equalsIgnoreCase("Others")) {
				helper.setTo(new String[] { request.getEmailAddress(), business });
			}

			helper.setText(html, true);
			helper.setFrom(sender);
			helper.setSubject("Your idea submitted Succesfully!!");
			emailService.sendEmail(mailMessage);

		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error(
					"In template,if any missing field then error displays for Submit your idea ===============> {} ");
			response1.setResponseCode(EnumResponseCodes.ER517.getCode());
			response1.setResponsemessage(EnumResponseCodes.ER517.getMessage());

			return response1;
		}
		return response;
	}
}
