package cz.itnetwork.security;

import cz.itnetwork.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility component for creating and validating JWT tokens.
 * The secret key and expiration duration are injected from application properties.
 */
@Component
public class JwtUtil {

    private final Key key;
    private final long expiration;

    /**
     * Initialises the signing key and expiration from application properties.
     *
     * @param secret     Base64-encoded HMAC-SHA256 secret (jwt.secret)
     * @param expiration token lifetime in milliseconds (jwt.expiration)
     */
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration}") long expiration) {
        this.key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(secret));
        this.expiration = expiration;
    }

    /**
     * Generates a signed JWT token for the given user.
     * The token contains the user's email as subject and their role as a custom claim.
     *
     * @param user authenticated user entity
     * @return compact JWT string
     */
    public String generateToken(UserEntity user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates a JWT token by verifying its signature and checking that it has not expired.
     *
     * @param token JWT string to validate
     * @return {@code true} if the token is valid, {@code false} otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extracts the email address (subject claim) from a JWT token.
     *
     * @param token valid JWT string
     * @return email stored in the token's subject claim
     */
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
