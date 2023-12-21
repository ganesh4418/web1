package com.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.model.SubmitYourIdeaModel;

@Repository
public interface SubmitYourIdeaRepository extends JpaRepository<SubmitYourIdeaModel, Integer> {

}
