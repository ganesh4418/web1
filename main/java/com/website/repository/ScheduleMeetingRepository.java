package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.ScheduleMeetingModel;
@Repository
public interface ScheduleMeetingRepository extends JpaRepository<ScheduleMeetingModel, Integer> {

}