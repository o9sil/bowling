package com.gdu.bowling;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BowlingRestController {

	
	@Autowired private BowlingService bowlingService;
	
	@GetMapping("/getScoreRankList")
	public List<ScoreRanking> getScoreRankList(){
		
		List<ScoreRanking> list = bowlingService.getScoreRankList();
		
		for(ScoreRanking s : list) {
			System.out.println(s);
		}
		
		return bowlingService.getScoreRankList();
	}
	
	@GetMapping("/addScoreBoard")
	public void addScoreBoard(@RequestParam(value="playerNameList[]") List<String> playerNameList, @RequestParam(value="pinBoardFrame[]") List<List<Integer>> pinBoardFrame, @RequestParam(value="scoreBoard[]") List<List<Integer>> scoreBoard) {
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("playerNameList", playerNameList);
		map.put("pinBoardFrame", pinBoardFrame);
		map.put("scoreBoard", scoreBoard);
		
		bowlingService.addPinBoardFrameScore(map);
		
		
	}
}
