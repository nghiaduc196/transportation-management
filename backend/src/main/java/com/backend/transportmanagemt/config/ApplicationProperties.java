package com.backend.transportmanagemt.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Backend.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    private String baseDir;
    private String baseUrl;
    private String linkConfig;

    public String getBaseDir() {
        return baseDir;
    }

    public void setBaseDir(String baseDir) {
        this.baseDir = baseDir;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getLinkConfig() {
        return linkConfig;
    }

    public void setLinkConfig(String linkConfig) {
        this.linkConfig = linkConfig;
    }
}
