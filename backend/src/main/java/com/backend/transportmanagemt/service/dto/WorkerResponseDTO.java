package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.User;

public class WorkerResponseDTO {
    private Long id;
    private String fullName;

    public WorkerResponseDTO(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
