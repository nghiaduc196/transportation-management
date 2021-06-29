package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.ReportWorkersDetail;

public class ReportWorkersDetailResponseDTO {
    private Long id;
    private UserResponseDTO user;

    public ReportWorkersDetailResponseDTO() {
    }

    public ReportWorkersDetailResponseDTO(ReportWorkersDetail workersDetail) {
        this.id = workersDetail.getId();
        this.user = new UserResponseDTO(workersDetail.getWorker());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }
}
