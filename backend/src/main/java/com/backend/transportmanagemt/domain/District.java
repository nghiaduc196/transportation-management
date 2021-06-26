package com.backend.transportmanagemt.domain;


import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "district")
public class District extends AbstractAuditingEntity{

    @Id
    private String code;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "province_code", referencedColumnName = "code")
    private Province province;

    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL)
    private Set<User> users;

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Province getProvince() {
        return province;
    }


    @Override
    public String toString() {
        return "District [code=" + code + ", name=" + name + ", province=" + province + "]";
    }

}
