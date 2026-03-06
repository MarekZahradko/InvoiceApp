package cz.itnetwork.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/** Base Spring MVC configuration. Enables web MVC support for the application. */
@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
}
