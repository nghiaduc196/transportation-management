package com.backend.transportmanagemt.service.dto;

import java.util.Set;

public class ReportWorkRequestDTO {
    private Long id;
    private String licensePlate;
    private String addressStart;
    private String addressEnd;
    private String phoneCustomer;
    private String description;
    private Double totalMoney;
    private Set<ReportWorkersDetailRequestDTO> workersDetailRequestDTOS;
    private Set<ReportWorkersDetailRequestDTO> workersDetailDeleteRequestDTOS;

    public ReportWorkRequestDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getAddressStart() {
        return addressStart;
    }

    public void setAddressStart(String addressStart) {
        this.addressStart = addressStart;
    }

    public String getAddressEnd() {
        return addressEnd;
    }

    public void setAddressEnd(String addressEnd) {
        this.addressEnd = addressEnd;
    }

    public String getPhoneCustomer() {
        return phoneCustomer;
    }

    public void setPhoneCustomer(String phoneCustomer) {
        this.phoneCustomer = phoneCustomer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ReportWorkersDetailRequestDTO> getWorkersDetailRequestDTOS() {
        return workersDetailRequestDTOS;
    }

    public void setWorkersDetailRequestDTOS(Set<ReportWorkersDetailRequestDTO> workersDetailRequestDTOS) {
        this.workersDetailRequestDTOS = workersDetailRequestDTOS;
    }

    public Set<ReportWorkersDetailRequestDTO> getWorkersDetailDeleteRequestDTOS() {
        return workersDetailDeleteRequestDTOS;
    }

    public void setWorkersDetailDeleteRequestDTOS(Set<ReportWorkersDetailRequestDTO> workersDetailDeleteRequestDTOS) {
        this.workersDetailDeleteRequestDTOS = workersDetailDeleteRequestDTOS;
    }

    public Double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
    }
}
