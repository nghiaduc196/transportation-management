package com.backend.transportmanagemt.web.rest;

import com.backend.transportmanagemt.service.ReportWorkService;
import com.backend.transportmanagemt.service.dto.ReportWorkRequestDTO;
import com.backend.transportmanagemt.service.dto.ReportWorkResponseDTO;
import com.backend.transportmanagemt.web.rest.errors.BadRequestAlertException;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@Transactional
public class ReportWorkResource {
    private final Logger log = LoggerFactory.getLogger(ReportWorkResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

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

    @GetMapping("/report-work")
    public ResponseEntity<List<ReportWorkResponseDTO>> filter(ReportWorkRequestDTO requestDTO,
                                                              @RequestParam(value = "login", required = false) String login,
                                                              @RequestParam(value = "name", required = false) String name,
                                                              @RequestParam(value = "createdDateFrom", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date createdDateFrom,
                                                              @RequestParam(value = "createdDateTo", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date createdDateTo,
                                                              @RequestParam(value = "implementationDateFrom", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date implementationDateFrom,
                                                              @RequestParam(value = "implementationDateTo", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date implementationDateTo,
                                                              Pageable pageable) {
        log.debug("REST request to get report work filter : {}", requestDTO);
        final Page<ReportWorkResponseDTO> page = reportWorkService.filter(requestDTO, login, name, createdDateFrom, createdDateTo, implementationDateFrom, implementationDateTo, pageable).map(ReportWorkResponseDTO::new);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/report-work/{id}")
    public ResponseEntity<ReportWorkResponseDTO> getById(@PathVariable Long id) {
        log.debug("REST request to get report : {}", id);
        return ResponseUtil.wrapOrNotFound(
            reportWorkService.findById(id)
                .map(ReportWorkResponseDTO::new));
    }
}
