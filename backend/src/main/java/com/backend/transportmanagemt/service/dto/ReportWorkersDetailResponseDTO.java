package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.ReportWorkersDetail;

public class ReportWorkersDetailResponseDTO {
    private Long id;
    private WorkerResponseDTO user;

    public ReportWorkersDetailResponseDTO() {
    }

    public ReportWorkersDetailResponseDTO(ReportWorkersDetail workersDetail) {
        this.id = workersDetail.getId();
        this.user = new WorkerResponseDTO(workersDetail.getWorker());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WorkerResponseDTO getUser() {
        return user;
    }

    public void setUser(WorkerResponseDTO user) {
        this.user = user;
    }
}
