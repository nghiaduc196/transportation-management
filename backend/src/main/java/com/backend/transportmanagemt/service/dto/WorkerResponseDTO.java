package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.User;

public class WorkerResponseDTO {
    private Long id;
    private String fullName;
    private String phone;

    public WorkerResponseDTO(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.phone = user.getPhoneNumber();
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
