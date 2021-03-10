package com.azeti.scoreboard.repository;

import com.azeti.scoreboard.entity.Scoreboard;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ScoreboardRepository extends JpaRepository<Scoreboard, Long> {
    List<Scoreboard> findAll(Sort sort);
}
