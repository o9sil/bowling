package com.gdu.bowling;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BowlingMapper {

	public List<ScoreRanking> selectScoreRankList();
	
	public int insertPinBoardOne(PinBoard pinBoard);
	
	public int insertFrameScoreOne(FrameScore frameScore);
	
	public int insertScoreBoardOne(ScoreBoard scoreBoard);
}
