package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.ReportWork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;


@Repository
public interface ReportWorkRepository extends JpaRepository<ReportWork, Long> {
    @Query(value = "SELECT rw FROM ReportWork rw inner join rw.createdUser u WHERE 1 = 1 " +
        "AND (:name IS NULL OR rw.nameCustomer LIKE %:name% or rw.phoneCustomer like %:name% or u.fullName like %:name%) " +
        "AND (:createdDateStart IS NULL OR rw.createdDate >= :createdDateStart) " +
        "AND (:createdDateEnd IS NULL OR rw.createdDate <= :createdDateEnd)" +
        "AND (:implementationDateStart IS NULL OR rw.implementationDate >= :implementationDateStart)" +
        "AND (:implementationDateEnd IS NULL OR rw.implementationDate <= :implementationDateEnd)")
    Page<ReportWork> filterForAdmin(@Param("name") String name,
                                    @Param("createdDateStart") Instant createdDateStart,
                                    @Param("createdDateEnd") Instant createdDateEnd,
                                    @Param("implementationDateStart") Instant implementationDateStart,
                                    @Param("implementationDateEnd") Instant implementationDateEnd,
                                    Pageable pageable);

    @Query(value = "SELECT rw FROM ReportWork rw inner join rw.createdUser u where 1 = 1" +
        "AND (rw.createdUser.login = :login)" +
        "AND (:name IS NULL OR rw.nameCustomer LIKE %:name% or rw.phoneCustomer like %:name% or u.fullName like %:name%) " +
        "AND (:createdDateStart IS NULL OR rw.createdDate >= :createdDateStart) " +
        "AND (:createdDateEnd IS NULL OR rw.createdDate <= :createdDateEnd)" +
        "AND (:implementationDateStart IS NULL OR rw.implementationDate >= :implementationDateStart)" +
        "AND (:implementationDateEnd IS NULL OR rw.implementationDate <= :implementationDateEnd)")
    Page<ReportWork> filterForUser(@Param("login")String login,
                                   @Param("name") String name,
                                   @Param("createdDateStart") Instant createdDateStart,
                                   @Param("createdDateEnd") Instant createdDateEnd,
                                   @Param("implementationDateStart") Instant implementationDateStart,
                                   @Param("implementationDateEnd") Instant implementationDateEnd,
                                   Pageable pageable);
}
