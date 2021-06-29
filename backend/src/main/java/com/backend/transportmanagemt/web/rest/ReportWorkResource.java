package com.backend.transportmanagemt.web.rest;

import com.backend.transportmanagemt.service.ReportWorkService;
import com.backend.transportmanagemt.service.dto.ReportWorkRequestDTO;
import com.backend.transportmanagemt.service.dto.ReportWorkResponseDTO;
import com.backend.transportmanagemt.web.rest.errors.BadRequestAlertException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
@Transactional
public class ReportWorkResource {
    private final Logger log = LoggerFactory.getLogger(ReportWorkResource.class);

    @Autowired
    ReportWorkService reportWorkService;

    @PostMapping("/report-work")
    public ResponseEntity<ReportWorkResponseDTO> create(ReportWorkRequestDTO requestDTO, @RequestParam(value = "images", required = false) MultipartFile[] images) throws URISyntaxException, JsonProcessingException {
        if(requestDTO.getId()!=null){
            throw new BadRequestAlertException("Cannot pass ID!", "reportManagement", "idcannotpass");
        }
        ReportWorkResponseDTO responseDTO = new ReportWorkResponseDTO(reportWorkService.create(requestDTO, images));
        return ResponseEntity.created(new URI("/api/report-work" + responseDTO.getId()))
            .body(responseDTO);
    }
}
