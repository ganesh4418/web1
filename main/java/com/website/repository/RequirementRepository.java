package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.RequirementModel;

@Repository
public interface RequirementRepository extends JpaRepository<RequirementModel, Integer> {

}
