package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.IpDetails;



@Repository
public interface IpRepository extends JpaRepository<IpDetails, Integer> {

}
