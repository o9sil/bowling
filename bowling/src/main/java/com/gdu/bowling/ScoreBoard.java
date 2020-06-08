package com.gdu.bowling;

public class ScoreBoard {
	private int scoreboardNo;
	private String memberName;
	private int framescoreNo;
	private int pinboardNo;
	public int getScoreboardNo() {
		return scoreboardNo;
	}
	public void setScoreboardNo(int scoreboardNo) {
		this.scoreboardNo = scoreboardNo;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public int getFramescoreNo() {
		return framescoreNo;
	}
	public void setFramescoreNo(int framescoreNo) {
		this.framescoreNo = framescoreNo;
	}
	public int getPinboardNo() {
		return pinboardNo;
	}
	public void setPinboardNo(int pinboardNo) {
		this.pinboardNo = pinboardNo;
	}
	@Override
	public String toString() {
		return "ScoreBoard [scoreboardNo=" + scoreboardNo + ", memberName=" + memberName + ", framescoreNo="
				+ framescoreNo + ", pinboardNo=" + pinboardNo + "]";
	}
	
}
