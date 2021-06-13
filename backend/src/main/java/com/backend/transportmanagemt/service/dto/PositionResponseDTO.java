package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.Position;
import com.backend.transportmanagemt.domain.enums.CommonStatus;

import java.time.Instant;

public class PositionResponseDTO {
    private Long id;
    private String name;
    private CommonStatus status;
    private String createdBy;
    private Instant createdDate;


    public PositionResponseDTO(Position position) {
        this.id = position.getId();
        this.name = position.getName();
        this.status = position.getStatus();
        this.createdBy = position.getCreatedBy();
        this.createdDate = position.getCreatedDate();
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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }
}
