package com.azeti.scoreboard.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Scoreboard {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long scoreId;
    private String playerName;
    private Long score;
}
