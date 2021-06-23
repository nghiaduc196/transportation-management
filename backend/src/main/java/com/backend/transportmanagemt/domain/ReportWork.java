package com.backend.transportmanagemt.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
@Table(name = "report_work")

public class ReportWork extends AbstractAuditingEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User createdUser;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "address_start")
    private String addressStart;

    @Column(name = "address_end")
    private String addressEnd;

    @Column(name = "phone_customer")
    private String phoneCustomer;

    @Lob
    @Column(name = "depcription")
    private String depcription;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_id")
    private Set<ReportWorkDetail> workDetails;
}
