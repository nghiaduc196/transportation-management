package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.ReportWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportWorkRepository extends JpaRepository<ReportWork, Long> {
}
