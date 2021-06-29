package com.backend.transportmanagemt.service.dto;

public class ReportWorkersDetailRequestDTO {
    private Long id;
    private Long userId;

    public ReportWorkersDetailRequestDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
