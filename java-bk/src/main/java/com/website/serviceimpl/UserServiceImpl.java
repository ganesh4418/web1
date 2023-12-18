package com.website.serviceimpl;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

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
import com.website.Dto.UserRequestDto;
import com.website.model.UserModel;
import com.website.repository.UserRepository;
import com.website.service.EmailService;
import com.website.service.UserService;
import com.website.util.EnumResponseCodes;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userrepo;
	@Autowired
	private EmailService emailservice;
	@Autowired
	private Configuration config;
	@Value("${spring.mail.username}")
	private String sender;

	@Value("${spring.mail.password}")
	private String password;

	@Value("${spring.mail.business}")
	private String business;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public void savedetails(UserRequestDto request) {
		LOGGER.info("In UserServiceImpl ============> {} ", request);
		UserModel userModel = null;
		
		userModel=new UserModel();
		userModel.setOrganizationName(request.getOrganizationName());
		userModel.setBuildedTeam(request.getBuildedTeam());
		userModel.setMailId(request.getMailId());
		userModel.setDescription(request.getDescription());

		UserModel save = userrepo.save(userModel);

		if (save != null) {
			LOGGER.info("User Details =================> {}", request);
			ErrorResponseDto response = new ErrorResponseDto();
			Properties props = new Properties();
			Session session = Session.getInstance(props, new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(sender, password);
				}
			});
			MimeMessage mailMessage = new MimeMessage(session);

			try {
				LOGGER.info("User Details ============> {}", session);
				MimeMessageHelper helper = new MimeMessageHelper(mailMessage,
						MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
				Map<String, Object> model = new HashMap<>();
				model.put("request1", request);
				Template t = config.getTemplate("email-template.buildyourteam.html");
				String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

				helper.setTo(request.getMailId());
				helper.setFrom(sender);
				helper.setText(html, true);
				helper.setSubject("You are uploaded Succesfully!!");
				emailservice.sendEmail(mailMessage);

				helper.setTo(sender);
				helper.setSubject(" Requirment of Organization!!");
				helper.setText("The Organization name is " + save.getOrganizationName()
						+ " \r\nOrganization Requirments Description is  " + save.getDescription()
						+ " \r\nOrganization Requirments is " + save.getBuildedTeam());
				emailservice.sendEmail(mailMessage);

				helper.setTo(business);
				helper.setFrom(sender);
				helper.setText(html, true);
				helper.setSubject(" Requirment of Organization!!");
				emailservice.sendEmail(mailMessage);

			} catch (MessagingException | IOException | TemplateException e) {
				LOGGER.error("In template,if any field is missing then shows error for User ============> {}");
				response.setResponseCode(EnumResponseCodes.ER508.getCode());
				response.setResponsemessage(EnumResponseCodes.ER508.getMessage());
			}
		}
	}
}