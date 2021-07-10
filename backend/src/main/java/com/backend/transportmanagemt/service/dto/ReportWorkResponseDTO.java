package com.backend.transportmanagemt.service.dto;

import com.backend.transportmanagemt.domain.ReportWork;
import com.backend.transportmanagemt.domain.User;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

public class ReportWorkResponseDTO {
    private Long id;
    private String licensePlate;
    private String addressStart;
    private String addressEnd;
    private String nameCustomer;
    private String phoneCustomer;
    private String description;
    private String images;
    private BigDecimal totalMoney;
    private Instant implementationDate;
    private String userCreated;
    private Instant createdDate;
    private Set<ReportWorkersDetailResponseDTO> workers;

    public ReportWorkResponseDTO(ReportWork reportWork) {
        this.id = reportWork.getId();
        this.licensePlate = reportWork.getLicensePlate();
        this.addressStart = reportWork.getAddressStart();
        this.addressEnd = reportWork.getAddressEnd();
        this.phoneCustomer = reportWork.getPhoneCustomer();
        this.description = reportWork.getDescription();
        this.images = reportWork.getImages();
        this.totalMoney = reportWork.getTotalMoney();
        this.userCreated = reportWork.getCreatedUser().getFullName();
        this.implementationDate = reportWork.getImplementationDate();
        this.workers = reportWork.getWorkers().stream().map(ReportWorkersDetailResponseDTO::new).collect(Collectors.toSet());
        this.createdDate = reportWork.getCreatedDate();
        this.nameCustomer = reportWork.getNameCustomer();
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

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public Set<ReportWorkersDetailResponseDTO> getWorkers() {
        return workers;
    }

    public void setWorkers(Set<ReportWorkersDetailResponseDTO> workers) {
        this.workers = workers;
    }

    public String getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(String userCreated) {
        this.userCreated = userCreated;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public Instant getImplementationDate() {
        return implementationDate;
    }

    public void setImplementationDate(Instant implementationDate) {
        this.implementationDate = implementationDate;
    }
}

