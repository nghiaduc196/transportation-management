package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.Authority;

public class AuthoritiesResponseDTO {
    private String name;
    private String description;

    public AuthoritiesResponseDTO() {
    }

    public AuthoritiesResponseDTO(Authority authority) {
        this.name = authority.getName();
        this.description = authority.getDescription();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
