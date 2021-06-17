package com.backend.transportmanagemt.web.rest;

import com.backend.transportmanagemt.domain.Position;
import com.backend.transportmanagemt.security.AuthoritiesConstants;
import com.backend.transportmanagemt.service.PositionService;
import com.backend.transportmanagemt.service.dto.PositionRequestDTO;
import com.backend.transportmanagemt.service.dto.PositionResponseDTO;
import com.backend.transportmanagemt.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PositionResource {
    private final Logger log = LoggerFactory.getLogger(PositionResource.class);

    @Autowired
    PositionService positionService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @GetMapping("/position")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<PositionResponseDTO>> filter(PositionRequestDTO requestDTO, Pageable pageable) {
        log.debug("REST request to get position: {}", requestDTO);
        final Page<PositionResponseDTO> page = positionService.filter(requestDTO, pageable).map(PositionResponseDTO::new);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/position/enable")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<PositionResponseDTO>> getAllByStatusEnable(Pageable pageable) {
        final Page<PositionResponseDTO> page = positionService.getAllByStatusEnable(pageable).map(PositionResponseDTO::new);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping("/position")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<PositionResponseDTO> create(@RequestBody PositionRequestDTO requestDTO) throws URISyntaxException {
        if (requestDTO.getId() != null) {
            throw new BadRequestAlertException("A new position cannot already have an ID", "position", "idexists");
        }
        PositionResponseDTO result = new PositionResponseDTO(positionService.create(requestDTO));
        return ResponseEntity
            .created(new URI("/api/position/" + result.getId()))
            .headers(HeaderUtil.createAlert(applicationName, result.getId().toString(), "Success"))
            .body(result);
    }

    @PutMapping("/position")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<PositionResponseDTO> update(@RequestBody PositionRequestDTO requestDTO) {
        log.debug("REST request update: {}", requestDTO.getId());
        Position check = positionService.findById(requestDTO.getId()).orElse(null);
        log.debug("RESPONSE request update: {}", check);

        if (check == null) {
            throw new BadRequestAlertException("ID doesn't exists!", "PositionManagement", "idnotexists");
        }
        Optional<PositionResponseDTO> update = positionService.update(requestDTO).map(PositionResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(update, HeaderUtil.createAlert(applicationName, update.get().getId().toString(), "Success"));
    }


    @DeleteMapping("/position/{id}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete Position: {}", id);
        positionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert(applicationName, id.toString(), "Success")).build();
    }

    @PutMapping("/position/update-status")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<PositionResponseDTO> changeStatus(@RequestBody PositionRequestDTO requestDTO) {
        log.debug("REST request change status: {}", requestDTO.getId());
        Optional<Position> check = positionService.findById(requestDTO.getId());
        if (!check.isPresent()) {
            throw new BadRequestAlertException("ID doesn't exists!", "PositionManagement", "idnotexists");
        }
        Optional<PositionResponseDTO> update = positionService.changeStatus(requestDTO).map(PositionResponseDTO::new);
        return ResponseUtil.wrapOrNotFound(update, HeaderUtil.createAlert(applicationName, update.get().getId().toString(), "Success"));
    }
}
