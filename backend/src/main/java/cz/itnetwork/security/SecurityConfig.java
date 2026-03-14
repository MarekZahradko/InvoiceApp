package cz.itnetwork.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Central Spring Security configuration.
 * Configures JWT-based stateless authentication, CORS, CSRF, and role-based access rules.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    /**
     * Defines the security filter chain:
     * <ul>
     *   <li>CORS enabled with permissive configuration for development</li>
     *   <li>CSRF disabled (not needed for stateless REST API)</li>
     *   <li>Session management set to STATELESS (JWT used instead of sessions)</li>
     *   <li>Role-based access: ADMIN can write; both ADMIN and USER can read</li>
     *   <li>JWT filter runs before the standard username/password filter</li>
     * </ul>
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight requests
                        .requestMatchers("/api/auth/**").permitAll()            // Public auth endpoints
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**", "/v3/api-docs/**").permitAll()

                        // Persons: read for all authenticated users, write only for ADMIN
                        .requestMatchers(HttpMethod.GET, "/api/persons/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.POST, "/api/persons/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/persons/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/persons/**").hasRole("ADMIN")

                        // Invoices: read for all authenticated users, write only for ADMIN
                        .requestMatchers(HttpMethod.GET, "/api/invoices/**").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.POST, "/api/invoices/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/invoices/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/invoices/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/identification/**").hasAnyRole("ADMIN", "USER")
                        // Statistics export: accessible to all authenticated users
                        .requestMatchers(HttpMethod.GET, "/api/statistics/**").hasAnyRole("ADMIN", "USER")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * CORS configuration that allows all origins and common HTTP methods.
     * Intended for development; restrict allowed origins in production.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    /** Provides a BCrypt password encoder bean used for hashing user passwords. */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /** Exposes the {@link AuthenticationManager} as a bean so it can be injected into services. */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
