package com.backend.transportmanagemt.repository;

import com.backend.transportmanagemt.domain.Authority;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    Page<Authority> findAllByNameContaining(String name, Pageable pageable);

}
