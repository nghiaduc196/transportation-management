package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.ReportWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ReportWorkRepository extends JpaRepository<ReportWork, Long> {
    @Query(value = "SELECT rw FROM ReportWork rw")
    Page<ReportWork> filterForAdmin(Pageable pageable);

    @Query(value = "SELECT rw FROM ReportWork rw where 1 = 1" +
        "And rw.createdUser.login = :login")
    Page<ReportWork> filterForUser(@Param("login")String login, Pageable pageable);
}
