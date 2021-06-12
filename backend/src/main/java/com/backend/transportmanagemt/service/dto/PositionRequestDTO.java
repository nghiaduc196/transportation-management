package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.enums.CommonStatus;

public class PositionRequestDTO {
    private Long id;
    private String name;
    private CommonStatus status;

    public PositionRequestDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CommonStatus getStatus() {
        return status;
    }

    public void setStatus(CommonStatus status) {
        this.status = status;
    }
}
