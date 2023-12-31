package com.preproject.seb_pre_15.auth.config;


//import com.preproject.seb_pre_15.auth.filter.JwtExceptionFilter;
import com.preproject.seb_pre_15.auth.filter.JwtVerificationFilter;
import com.preproject.seb_pre_15.auth.handler.OAuth2memberSuccessHandler;
import com.preproject.seb_pre_15.auth.jwt.JwtTokenizer;
import com.preproject.seb_pre_15.auth.utils.CustomAuthorityUtils;
import com.preproject.seb_pre_15.member.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {


    //TODO:
    // MemberService 구현후 DI받아서 OAuth2memberSuccessHandler생성자에 추가
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Bean//개발환경
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin() //h2 이용하기위한 설정
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2.successHandler(new OAuth2memberSuccessHandler(jwtTokenizer,authorityUtils,memberService)));
        return http.build();
    }

//    @Bean//실제
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http
//
//                .csrf().disable()
//                .cors(withDefaults())
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .exceptionHandling()
//                .and()
//                .apply(new CustomFilterConfigurer())
//                .and()
//                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
//                .oauth2Login(oauth2 -> oauth2.successHandler(new OAuth2memberSuccessHandler(jwtTokenizer,authorityUtils)));
//        return http.build();
//    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOriginPatterns(Arrays.asList("{url}"));
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
//        configuration.setAllowCredentials(Boolean.valueOf(true));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils);
//            JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter();
//            builder.addFilterBefore(jwtExceptionFilter, jwtVerificationFilter.getClass());
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }
}
