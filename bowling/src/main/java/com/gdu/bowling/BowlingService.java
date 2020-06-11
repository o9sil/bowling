package com.gdu.bowling;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BowlingService {

	@Autowired private BowlingMapper bowlingMapper;
	
	//상위 10명 기록 출력
	public List<ScoreRanking> getScoreRankList(){
		return bowlingMapper.selectScoreRankList();
	}
	
		
	@SuppressWarnings("unchecked")
	public void addPinBoardFrameScore(Map<String, Object> map) {
				
		List<String> playerNameList = (List<String>) map.get("playerNameList");
		List<List<Integer>> pinBoardFrame = (List<List<Integer>>) map.get("pinBoardFrame");
		List<List<Integer>> scoreBoard = (List<List<Integer>>) map.get("scoreBoard");
		
//		
//		for(String r : playerNameList) {
//			System.out.print("플레이어 이름 : " + r);
//		}
		
		//플레이어 수 만큼 반복
		for(int i=0; i<playerNameList.size(); i++) {
			PinBoard p = new PinBoard();
			
			FrameScore f= new FrameScore();
			
			for(int j = 0; j < 10; j++) {
				int k = (i*10) + j;
				
				if(j % 10 == 0) {
					p.setPinboardFrameOneFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameOneSecond(pinBoardFrame.get(k).get(1));
										
					f.setFramescoreScoreOne(scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 1) {
					p.setPinboardFrameTwoFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameTwoSecond(pinBoardFrame.get(k).get(1));
										
					f.setFramescoreScoreTwo(f.getFramescoreScoreOne() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 2) {
					p.setPinboardFrameThreeFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameThreeSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreThree(f.getFramescoreScoreTwo() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 3) {
					p.setPinboardFrameFourFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameFourSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreFour(f.getFramescoreScoreThree() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 4) {
					p.setPinboardFrameFiveFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameFiveSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreFive(f.getFramescoreScoreFour() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 5) {
					p.setPinboardFrameSixFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameSixSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreSix(f.getFramescoreScoreFive() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 6) {
					p.setPinboardFrameSevenFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameSevenSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreSeven(f.getFramescoreScoreSix() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 7) {
					p.setPinboardFrameEightFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameEightSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreEight(f.getFramescoreScoreSeven() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 8) {
					p.setPinboardFrameNineFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameNineSecond(pinBoardFrame.get(k).get(1));
					
					f.setFramescoreScoreNine(f.getFramescoreScoreEight() + scoreBoard.get(k).get(3));
					
				}else if(j % 10 == 9) {
					p.setPinboardFrameTenFirst(pinBoardFrame.get(k).get(0));
					p.setPinboardFrameTenSecond(pinBoardFrame.get(k).get(1));
					p.setPinboardFrameTenThird(pinBoardFrame.get(k).get(2));
					
					f.setFramescoreScoreTen(f.getFramescoreScoreNine() + scoreBoard.get(k).get(3));
					
				}
				
				
				
			}
		
			
			//한명씩 볼링핀 기록하기
			bowlingMapper.insertPinBoardOne(p);
			bowlingMapper.insertFrameScoreOne(f);
			
			//이름과 함께 점수 위치 기록하기
			ScoreBoard scoreboard = new ScoreBoard();
			scoreboard.setMemberName(playerNameList.get(i));
			scoreboard.setPinboardNo(p.getPinboardNo());
			scoreboard.setFramescoreNo(f.getFramescoreNo());
			
			
			bowlingMapper.insertScoreBoardOne(scoreboard);			
		}
		
		
	}
	
	
}
