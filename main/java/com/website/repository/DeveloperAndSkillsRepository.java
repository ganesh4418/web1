package com.website.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.DeveloperAndSkillsModel;

@Repository
public interface DeveloperAndSkillsRepository extends JpaRepository<DeveloperAndSkillsModel, Integer> {
	public List<DeveloperAndSkillsModel> findAll();

}
