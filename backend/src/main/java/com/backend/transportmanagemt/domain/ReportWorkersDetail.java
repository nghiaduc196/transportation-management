package com.backend.transportmanagemt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "report_workers_detail")
public class ReportWorkersDetail extends AbstractAuditingEntity{
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User worker;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "report_id", insertable = false, updatable = false)
    private ReportWork reportWork;

    public ReportWorkersDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }

    public ReportWork getReportWork() {
        return reportWork;
    }

    public void setReportWork(ReportWork reportWork) {
        this.reportWork = reportWork;
    }


}
