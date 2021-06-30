package com.backend.transportmanagemt.service.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

public class ReportWorkRequestDTO {
    private Long id;
    private String licensePlate;
    private String addressStart;
    private String addressEnd;
    private String phoneCustomer;
    private String description;
    private BigDecimal totalMoney;
    private Set<ReportWorkersDetailRequestDTO> workersDetailRequestDTOS;
    private Set<ReportWorkersDetailRequestDTO> workersDetailDeleteRequestDTOS;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

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

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "ReportWorkRequestDTO{" +
            "id=" + id +
            ", licensePlate='" + licensePlate + '\'' +
            ", addressStart='" + addressStart + '\'' +
            ", addressEnd='" + addressEnd + '\'' +
            ", phoneCustomer='" + phoneCustomer + '\'' +
            ", description='" + description + '\'' +
            ", totalMoney=" + totalMoney +
            ", workersDetailRequestDTOS=" + workersDetailRequestDTOS +
            ", workersDetailDeleteRequestDTOS=" + workersDetailDeleteRequestDTOS +
            '}';
    }
}
