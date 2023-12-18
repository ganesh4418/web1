package com.website.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@ComponentScan(basePackages = { "com" })
@EntityScan("com.website.model")
@EnableJpaRepositories("com")
@SpringBootApplication
public class WebsiteApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(WebsiteApplication.class, args);
	}
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WebsiteApplication.class);
	}

}
