package com.backend.transportmanagemt.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "province")
public class Province {

    @Id
    private String code;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL)
    private Set<User> users;

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Province [code=" + code + ", name=" + name + "]";
    }
}
