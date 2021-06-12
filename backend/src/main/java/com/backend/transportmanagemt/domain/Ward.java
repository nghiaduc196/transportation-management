package com.backend.transportmanagemt.domain;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "ward")
public class Ward {

    @Id
    private String code;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "district_code", referencedColumnName = "code")
    private District district;

    @OneToMany(mappedBy = "ward", cascade = CascadeType.ALL)
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

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    @Override
    public String toString() {
        return "Ward [code=" + code + ", name=" + name + ", district=" + district + "]";
    }

}
