package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.HiringModel;

@Repository
public interface HiringRepository extends JpaRepository<HiringModel, Integer> {

}
