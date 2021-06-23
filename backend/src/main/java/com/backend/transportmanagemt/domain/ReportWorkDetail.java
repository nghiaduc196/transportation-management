package com.backend.transportmanagemt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "report_work_detail")
public class ReportWorkDetail extends AbstractAuditingEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User createdUser;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "report_id", insertable = false, updatable = false)
    private ReportWork reportWork;
}
