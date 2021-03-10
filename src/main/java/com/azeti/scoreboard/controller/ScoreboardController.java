package com.azeti.scoreboard.controller;

import com.azeti.scoreboard.entity.Scoreboard;
import com.azeti.scoreboard.service.ScoreboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scoreboard")
public class ScoreboardController {

    @Autowired
    private ScoreboardService scoreboardService;

    @PostMapping("/")
    public Scoreboard saveScoreboard(@RequestBody Scoreboard scoreboard) {
        return scoreboardService.saveScoreboard(scoreboard);
    }

    @GetMapping("/")
    public List<Scoreboard> getScoreboard(@RequestParam(defaultValue = "score") String sortBy) {
        return scoreboardService.getScoreboard(sortBy);
    }
}
