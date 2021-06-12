package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.Position;
import com.backend.transportmanagemt.domain.enums.CommonStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

    Optional<Position> findTopByName(@Param("name") String name);

    @Query(value = "SELECT p FROM Position p WHERE 1=1 " +
        "AND (:status IS NULL OR p.status <> :status) " +
        "AND (:name IS NULL OR p.name like %:name%)")
    Page<Position> filter(@Param("name") String name,
                          @Param("status") CommonStatus status,
                          Pageable pageable);
}
