package com.azeti.scoreboard.service;


import com.azeti.scoreboard.entity.Scoreboard;
import com.azeti.scoreboard.repository.ScoreboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreboardService {

    @Autowired
    private ScoreboardRepository scoreboardRepository;

    public Scoreboard saveScoreboard(Scoreboard scoreboard) {
        return scoreboardRepository.save(scoreboard);
    }

    public List<Scoreboard> getScoreboard(String sortBy) {
        return scoreboardRepository.findAll(Sort.by(Sort.Direction.DESC, sortBy));
    }

    public void deleteAll() { scoreboardRepository.deleteAll(); };
}
