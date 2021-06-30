package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.ReportWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface ReportWorkRepository extends JpaRepository<ReportWork, Long> {
    @Query(value = "SELECT rw FROM ReportWork rw")
    Page<ReportWork> filter(Pageable pageable);
}
