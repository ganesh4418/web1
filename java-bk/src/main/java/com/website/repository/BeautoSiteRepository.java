package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.BeautoSiteModel;

@Repository
public interface BeautoSiteRepository extends JpaRepository<BeautoSiteModel, Integer> {

}
