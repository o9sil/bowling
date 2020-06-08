//플레이어 인원
let playerCnt = 0;

$('#playerCount').change(function() {
    $('#playerList').css('display', '');
    $('#bowlingPin').css('display', 'none');
    $('#playerFrame').css('display', 'none');
    playerCnt = 0;
    frameNum = 1;
    playerNum = 1;
    frameFirstSecond = 1;
    for (let i = 0; i < pinArray.length; i++) {
        pinArray[i] = true;
    }
    $('#playerList').empty();
    $('#bowlingBody').empty();
    if (this.value != 0) {
        playerCnt = this.value;
        for (let i = 1; i <= this.value; i++) {
            $('#playerList').append('<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">' + i + '번째 선수</span></div><input type="text" id="playerInput' + i + '" class="form-control"></div>')
        }
        $('#playerList').append('<div><button type="button" class="btn btn-primary" id="addPlayer">선수입력</button></div>')

        for (let i = 1; i <= this.value; i++) {
            $('#bowlingBody').append('<tr id=tableTr' + i + '><td rowspan="2"><span id="playerName' + i + '"></span></td><td><span id="player' + i + '_frame1_1"></span></td><td><span id="player' + i + '_frame1_2"></span></td><td><span id="player' + i + '_frame2_1"></span></td><td><span id="player' + i + '_frame2_2"></span></td><td><span id="player' + i + '_frame3_1"></span></td><td><span id="player' + i + '_frame3_2"></span></td><td><span id="player' + i + '_frame4_1"></span></td><td><span id="player' + i + '_frame4_2"></span></td><td><span id="player' + i + '_frame5_1"></span></td><td><span id="player' + i + '_frame5_2"></span></td><td><span id="player' + i + '_frame6_1"></span></td><td><span id="player' + i + '_frame6_2"></span></td><td><span id="player' + i + '_frame7_1"></span></td><td><span id="player' + i + '_frame7_2"></span></td><td><span id="player' + i + '_frame8_1"></span></td><td><span id="player' + i + '_frame8_2"></span></td><td><span id="player' + i + '_frame9_1"></span></td><td><span id="player' + i + '_frame9_2"></span></td><td><span id="player' + i + '_frame10_1"></span></td><td><span id="player' + i + '_frame10_2"></span></td><td><span id="player' + i + '_frame10_3"></span></td><td rowspan="2" colspan="2"><span id="player' + i + '_totalScore"></span></td></tr>');
            $('#bowlingBody').append('<tr><!-- <td></td> --><td colspan="2"><span id="player' + i + '_score1"></span></td><td colspan="2"><span id="player' + i + '_score2"></span></td><td colspan="2"><span id="player' + i + '_score3"></span></td><td colspan="2"><span id="player' + i + '_score4"></span></td><td colspan="2"><span id="player' + i + '_score5"></span></td><td colspan="2"><span id="player' + i + '_score6"></span></td><td colspan="2"><span id="player' + i + '_score7"></span></td><td colspan="2"><span id="player' + i + '_score8"></span></td><td colspan="2"><span id="player' + i + '_score9"></span></td><td colspan="3"><span id="player' + i + '_score10"></span></td><!-- <td>&nbsp;</td> --></tr>');
        }
    }
});

//선수 이름 입력
$(document).on('click', '#addPlayer', function() {
    for (let i = 1; i <= playerCnt; i++) {
        if ($('#playerInput' + i).val() == '') {
            alert('선수 이름을 입력하세요.');
            return;
        }
    }

    for (let i = 1; i <= playerCnt; i++) {
        $('#playerName' + i).text($('#playerInput' + i).val());
    }
    $('#bowlingPin').css('display', '');

    $('#playerFrame').css('display', '');


    $('#playerName').text($('#playerName1').text());
    $('#frameNum').text(frameNum);

    $('#playerList').css('display', 'none');

    scoreBoard = [];
    //기록 할 배열 생성(1번투구 점수, 2번투구점수, 3번투구점수, 합계점수(스트라이크나 스페어면 추가점수 포함))      
    for (let i = 0; i < (playerCnt * 10); i++) {
        scoreBoard[i] = new Array(4);
    }

    pinBoardFrame = [];
    //매 프레임별 1번투구 쓰러트린핀, 2번투구 쓰러트린핀, 3번투구 쓰러트린핀
    for (let i = 0; i < (playerCnt * 10); i++) {
    	pinBoardFrame[i] = Array.apply(null, new Array(3)).map(Number.prototype.valueOf, 0);
    		//new Array(3).map(Number.prototype.valueOf, 0);
    }

    //플레이어 이름 등록
    for (let i = 0; i < playerCnt; i++) {
        playerNameList[i] = $('#playerName' + (i + 1)).text();
    }

});


//몇번째 프레임인지
let frameNum = 1;

//게임중인 플레이어
let playerNum = 1;

//프레임당 첫번째인지 두번째인지   1=첫번째 2=두번째
let frameFirstSecond = 1;

//남은 핀이 있는지
let pinArray = [true, true, true, true, true, true, true, true, true, true];


//점수 기록할 배열 생성
let scoreBoard = [

];

//프레임별로 몇번핀 쓰러트렸는지 기록할 배열 생성
let pinBoardFrame = [

];

//플레이어 이름
let playerNameList = [

];

//10번째 프레임일 경우만 사용
let tenFramePlayerNum = 1;
let tenFrameFirstSecondThird = 1;


//DB저장할 데이터들
let allData = null;


//게임 실작
$('#play').click(function() {
    //console.log($('#playerName' + playerNum).text() + ' 선수가' + frameFirstSecond + '번째 공을 굴렸습니다.');

    let pinBoard = 0;

    $('.pin').each(function(index, item) {
        if (!$(item).attr('disabled')) { // pin 체크가 활성화 되어있는경우만
            //이번에 체크한 것들만
            if (item.checked == true) {
                pinBoard += Math.pow(2, Number((item.id).substr(3)) - 1);
                //console.log((item.id).substr(3));
            }
        }
    });

    if (frameNum < 10) {
        pinBoardFrame[(playerNum - 1) * 10 + (frameNum - 1)][frameFirstSecond - 1] = pinBoard;
    } else {
        pinBoardFrame[(tenFramePlayerNum - 1) * 10 + (frameNum - 1)][tenFrameFirstSecondThird - 1] = pinBoard;
    }



    //1~9번 프레임
    if (frameNum < 10) {
        //console.log('frameNum = ' + frameNum + ' / playerNum = ' + playerNum + ' / frameFirstSecond = ' + frameFirstSecond);
        $('#tableTr' + playerNum + ' > td:eq(' + ((frameNum - 1) * 2 + frameFirstSecond) + ')').css('backgroundColor', '#F7FE2E');
    } else {
        //console.log('frameNum = ' + frameNum + ' / playerNum = ' + tenFramePlayerNum + ' / frameFirstSecond = ' + tenFrameFirstSecondThird);
        $('#tableTr' + tenFramePlayerNum + ' > td:eq(' + ((frameNum - 1) * 2 + tenFrameFirstSecondThird) + ')').css('backgroundColor', '#F7FE2E');
    }







    //1~9번 프레임인경우
    if (frameNum < 10) {
        //한 프레임의 첫번째 굴리는 시기
        if (frameFirstSecond == 1) {
            for (let i = 0; i < pinArray.length; i++) {
                pinArray[i] = true;
            }
        }

        let pinCnt = 0;
        $('.pin').each(function(index, item) {
            if (item.checked == true) {
                pinCnt += 1;

                for (let i = 1; i <= 10; i++) {
                    if (item.id == 'pin' + i) {

                        //쓰러트리면 false로 변경
                        if (pinArray[i - 1] == true) {
                            pinArray[i - 1] = false;
                        }
                    }
                }

            }
        });

        //console.log('pinCnt : ' + pinCnt);
        //console.log('pinArray : ' + pinArray);

        let checkPin = 0;
        for (let i = 0; i < pinArray.length; i++) {
            //남은 핀 개수
            if (pinArray[i] == true) {
                checkPin += 1;
            }
        }

        //첫번째 굴렸을때
        if (frameFirstSecond == 1) {
            //스트라이크가 아닐경우
            if (checkPin != 0) {
                frameFirstSecond = 2;

                $('.pin').each(function(index, item) {
                    if ($(this).is(':checked') == true) {
                        $(this).attr('disabled', true);
                    }
                });

                $('#player' + playerNum + '_frame' + frameNum + '_1').text(pinCnt);

                scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0] = pinCnt;




            } else {
                //스트라이크일 경우
                $('.pin').each(function(index, item) {
                    $(this).prop('checked', false);
                    $(this).attr('disabled', false);
                });

                //스트라이크일 경우 X 표시
                $('#player' + playerNum + '_frame' + frameNum + '_1').text('X');

                scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0] = 10;
                scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1] = 0;
                scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][3] = 10;
            }

            //2번째 프레임일 경우(1번째가 스트라이크인지 스페어처리 성공했는지 확인)
            if (frameNum == 2) {
                //2 프레임의 1번째 볼 굴렸을 경우   
                let sumFrameScore = scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] + scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][1];
                if (scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] == 10) {
                    //1 프레임이 스트라이크인 경우
                    //console.log('1프레임 스트라이크');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0];

                } else if (sumFrameScore == 10) {
                    //1 프레임이 스페어처리에 성공했을 경우
                    //console.log('1프레임 스페어 처리 성공');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0];
                    $('#player' + playerNum + '_score1').text(scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3]);
                }

            }


            //3~9번 프레임의 첫번째 볼 굴렸을 경우
            if (frameNum > 2) {
                // ex)3번프레임   1번프레임, 2번프레임 둘다 스트라이크일경우 => 1번프레임에 점수 추가, 2번프레임에도 점수 추가

                // 2번프레임만 스트라이크일 경우 => 2번프레임에 점수 추가

                // 2번프레임이 스페어처리 성공했을 경우 => 2번프레임에 점수 추가
                if (scoreBoard[(playerNum - 1) * 10 + (frameNum - 3)][0] == 10 && scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] == 10) {
                    //console.log('1,2번프레임 둘다 스트라이크');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 3)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0]; //1번프레임 점수추가
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0]; //2번프레임 점수추가



                    //2번프레임부터는 기존점수와 합쳐야함
                    if (frameNum > 3) {
                        let ssssum = 0;
                        for (let i = 0; i < (frameNum - 2); i++) {
                            ssssum += scoreBoard[(playerNum - 1) * 10 + (i)][3];
                        }
                        $('#player' + playerNum + '_score' + (frameNum - 2)).text(ssssum); //2번프레임~~~
                    } else {
                        $('#player' + playerNum + '_score' + (frameNum - 2)).text(scoreBoard[(playerNum - 1) * 10 + (frameNum - 3)][3]); //1번프레임 출력   
                    }

                } else if (scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] == 10) {
                    //console.log('2번프레임만 스트라이크');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0]; //2번프레임 점수추가
                } else if ((scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] + scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][1]) == 10) {
                    //console.log('2번프레임이 스페어처리성공');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0]; //2번프레임 점수추가

                    //기존 토탈점수와 합쳐야함
                    let totalScores = Number($('#player' + playerNum + '_score' + (frameNum - 2)).text()) + scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3];
                    $('#player' + playerNum + '_score' + (frameNum - 1)).text(totalScores); //2번프레임 출력
                }
            }


            if (checkPin == 0) {
                //마지막 주자일 경우
                if (playerNum == $('#playerCount').val()) {
                    //console.log('첫번째굴림 1');
                    playerNum = 1;
                    frameNum += 1;
                    frameFirstSecond = 1;
                } else {
                    //console.log('첫번째굴림 2');
                    playerNum += 1;
                    frameFirstSecond = 1;
                }
            }



        } else {
            //두번째 굴렸을때         

            //다음 프레임으로 이동
            $('.pin').each(function(index, item) {
                $(this).prop('checked', false);
                $(this).attr('disabled', false);
            });

            //첫번째(이전) 쓰러트린 핀 개수
            let firstPin = Number($('#player' + playerNum + '_frame' + frameNum + '_1').text());
            //두번째 쓰러트린 핀 개수
            let secondPin = pinCnt - firstPin;

            //스페어처리완료
            if ((firstPin + secondPin) == 10) {
                $('#player' + playerNum + '_frame' + frameNum + '_2').text('/');
            } else {
                //스페어 처리 실패
                $('#player' + playerNum + '_frame' + frameNum + '_2').text(secondPin);
            }

            scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1] = secondPin;
            scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][3] = scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0] + scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1];

            //스페어 처리 실패했을 경우 바로 출력
            if (frameNum == 1) {
                //console.log(frameNum + 'frameNum');
                if ((firstPin + secondPin) != 10) {
                    //console.log(frameNum + 'frameNum10');
                    $('#player' + playerNum + '_score1').text(scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][3]);
                }
            }

            //2번째 프레임일 경우(1번째가 스트라이크인지 스페어처리 성공했는지 확인)
            if (frameNum >= 2) {
                //2 프레임의 2번째 볼 굴렸을 경우
                if (scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][0] == 10) {
                    //1 프레임이 스트라이크인 경우
                    //console.log('1프레임 스트라이크');
                    scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3] += scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1];

                    //2번프레임부터는 기존점수와 합쳐야함
                    if (frameNum > 2) {
                        let ssssum = 0;
                        for (let i = 0; i < (frameNum - 1); i++) {
                            ssssum += scoreBoard[(playerNum - 1) * 10 + (i)][3];
                            //console.log(ssssum);
                        }
                        $('#player' + playerNum + '_score' + (frameNum - 1)).text(ssssum);

                        if ((scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0] + scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1]) != 10) {
                            //console.log('384');

                            ssssum = 0;
                            for (let i = 0; i < frameNum; i++) {
                                ssssum += scoreBoard[(playerNum - 1) * 10 + (i)][3];
                                //console.log(ssssum);
                            }
                            $('#player' + playerNum + '_score' + frameNum).text(ssssum);
                        }

                    } else {
                        //console.log('여긴가');
                        //console.log(scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][2]);
                        //console.log('#player' + playerNum + '_score' + (frameNum - 1));
                        $('#player' + playerNum + '_score' + (frameNum - 1)).text(scoreBoard[(playerNum - 1) * 10 + (frameNum - 2)][3]);


                        let ssssum = 0;
                        for (let i = 0; i < frameNum; i++) {
                            ssssum += scoreBoard[(playerNum - 1) * 10 + (i)][3];
                            //console.log(ssssum);
                        }

                        if ((scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][0] + scoreBoard[(playerNum - 1) * 10 + (frameNum - 1)][1]) == 10) {
                            //console.log('10점이 되었어요.');
                        } else {
                            //console.log('10점이 되지 않았어요');
                            $('#player' + playerNum + '_score' + frameNum).text(ssssum);
                        }

                    }


                } else {
                    let ssssum = 0;
                    for (let i = 0; i < frameNum; i++) {
                        ssssum += scoreBoard[(playerNum - 1) * 10 + (i)][3];
                        //console.log(ssssum);
                    }
                    //console.log('else');
                    //console.log(ssssum);

                    //console.log(firstPin);
                    //console.log(secondPin);

                    if ((firstPin + secondPin) != 10) {
                        $('#player' + playerNum + '_score' + frameNum).text(ssssum);
                    }





                }
            }


            //마지막 주자일 경우
            if (playerNum == $('#playerCount').val()) {
                //console.log('두번째굴림 1');
                playerNum = 1;
                frameNum += 1;
                frameFirstSecond = 1;
            } else {
                //console.log('두번째굴림 2');
                playerNum += 1;
                frameFirstSecond = 1;
            }


        }

        $('#playerName').text($('#playerName' + playerNum).text());
        $('#frameNum').text(frameNum);
    } else if (frameNum == 10) {

        //10번째 프레임의 첫번째 투구전
        if (tenFrameFirstSecondThird == 1) {
            for (let i = 0; i < pinArray.length; i++) {
                pinArray[i] = true;
            }

            let pinCnt = 0;
            $('.pin').each(function(index, item) {
                if (item.checked == true) {
                    pinCnt += 1;

                    for (let i = 1; i <= 10; i++) {
                        if (item.id == 'pin' + i) {

                            //쓰러트리면 false로 변경
                            if (pinArray[i - 1] == true) {
                                pinArray[i - 1] = false;
                            }
                        }
                    }

                }
            });

            let checkPin = 0;
            for (let i = 0; i < pinArray.length; i++) {
                //남은 핀 개수
                if (pinArray[i] == true) {
                    checkPin += 1;
                }
            }
            //console.log('10번째 1번 투구 후 남은 핀 개수 = ' + checkPin);

            //스트라이크
            if (pinCnt == 10) {
                $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text('X');
            } else {
                $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text(pinCnt);
            }


            //8번 스트라이크, 9번 스트라이크, 10번 아무거나 => 8번 출력
            //8번 스트라이크, 9번 스페어성공, 10번 아무거나 => 9번 출력

            //8번 스트라이크 말고, 9번 스페어, 10번 아무거나 => 9번 출력
            //8번 스트라이크 말고, 9번 스트라이크, 10번 아무거나 => 출력 없음                
            //8번 스트라이크 말고, 9번 스페어 실패, 10번 아무거나 => 출력 없음

            //10번 투구의 첫번째 점수 기록
            scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][0] = pinCnt;
            //10번 투구의 첫번째 점수를 10의 전체 합계에도 기록
            scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][3] = pinCnt;

            //8번이 스트라이크인 경우
            if (scoreBoard[(tenFramePlayerNum - 1) * 10 + 7][0] == 10) {
                if (scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] == 10) {
                    //8번 스트라이크, 9번 스트라이크    (8번 출력해야함)

                    //8, 9번의 합계점수 추가
                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 7][3] += pinCnt;
                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += pinCnt;
                    console.log('8번 합계점수는 = ' + scoreBoard[(tenFramePlayerNum - 1) * 10 + 7][3]);

                    //1~8번 프레임 합계 점수 출력
                    let ssssum = 0;
                    for (let i = 0; i < 8; i++) {
                        ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                    }
                    $('#player' + tenFramePlayerNum + '_score8').text(ssssum);

                } else if ((scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] + scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][1]) == 10) {
                    //8번 스트라이크, 9번 스페어 성공   (9번 출력해야함)

                    //9번에 점수 추가
                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += pinCnt;
                    console.log('9번 합계점수는 = ' + scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3]);

                    //1~9번 프레임 합계 점수 출력
                    let ssssum = 0;
                    for (let i = 0; i < 9; i++) {
                        ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                    }
                    $('#player' + tenFramePlayerNum + '_score9').text(ssssum);

                }
            } else {
                //8번 스트라이크 실패
                if (scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] == 10) {
                    //9번 스트라이크
                    //9번에 점수 추가
                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += pinCnt;
                    console.log('9번 합계점수는 = ' + scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][3]);

                } else {
                    //9번 스트라이크 말고
                    if ((scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] + scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][1]) == 10) {
                        //9번 스페어 성공   (9번 출력해야 함)
                        scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += pinCnt;
                        console.log('9번 합계점수는 = ' + scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3]);

                        //1~9번 프레임 합계 점수 출력
                        let ssssum = 0;
                        for (let i = 0; i < 9; i++) {
                            ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                        }
                        $('#player' + tenFramePlayerNum + '_score9').text(ssssum);

                    } else {
                        //출력 없음
                    }
                }
            }




            //스트라이크
            if (checkPin == 0) {
                //핀 초기화
                for (let i = 0; i < pinArray.length; i++) {
                    pinArray[i] = true;
                }
                $('.pin').each(function(index, item) {
                    $(this).prop('checked', false);
                    $(this).attr('disabled', false);
                });
            } else {
                //스트라이크 실패
                $('.pin').each(function(index, item) {
                    if ($(this).is(':checked') == true) {
                        $(this).attr('disabled', true);
                    }
                });

            }
            tenFrameFirstSecondThird++;

        } else if (tenFrameFirstSecondThird == 2) {
            //10번째 프레임의 두번째 투구



            //1번째가 스트라이크
            if ($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text() == 'X') {
                let pinCnt = 0;
                $('.pin').each(function(index, item) {
                    if (item.checked == true) {
                        pinCnt += 1;

                        for (let i = 1; i <= 10; i++) {
                            if (item.id == 'pin' + i) {
                                //쓰러트리면 false로 변경
                                if (pinArray[i - 1] == true) {
                                    pinArray[i - 1] = false;
                                }
                            }
                        }

                    }
                });

                let checkPin = 0;
                for (let i = 0; i < pinArray.length; i++) {
                    //남은 핀 개수
                    if (pinArray[i] == true) {
                        checkPin += 1;
                    }
                }

                //스트라이크
                if (pinCnt == 10) {
                    $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text('X');
                } else {
                    $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text(pinCnt);
                }

                //10-2, 10번프레임 점수 추가
                scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][1] = pinCnt;
                scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][3] += pinCnt;

                //9번 스트라이크
                if (scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] == 10) {

                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += pinCnt; //9번에 점수 추가

                    //1~9번 프레임 합계 점수 출력
                    let ssssum = 0;
                    for (let i = 0; i < 9; i++) {
                        ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                    }
                    $('#player' + tenFramePlayerNum + '_score9').text(ssssum);

                } else {
                    //9번이 스트라이크가 아님

                }



                //두번째도 스트라이크
                if (checkPin == 0) {
                    //핀 초기화
                    for (let i = 0; i < pinArray.length; i++) {
                        pinArray[i] = true;
                    }
                    $('.pin').each(function(index, item) {
                        $(this).prop('checked', false);
                        $(this).attr('disabled', false);
                    });
                } else {
                    //스트라이크 실패
                    $('.pin').each(function(index, item) {
                        if ($(this).is(':checked') == true) {
                            $(this).attr('disabled', true);
                        }
                    });

                }

                tenFrameFirstSecondThird++;

            } else {
                //1번째가 0~9점
                let pinCnt = 0;
                $('.pin').each(function(index, item) {
                    if (item.checked == true) {
                        pinCnt += 1;

                        for (let i = 1; i <= 10; i++) {
                            if (item.id == 'pin' + i) {
                                //쓰러트리면 false로 변경
                                if (pinArray[i - 1] == true) {
                                    pinArray[i - 1] = false;
                                }
                            }
                        }

                    }
                });

                let checkPin = 0;
                for (let i = 0; i < pinArray.length; i++) {
                    //남은 핀 개수
                    if (pinArray[i] == true) {
                        checkPin += 1;
                    }
                }


                //첫번째(이전) 쓰러트린 핀 개수
                let firstPin = Number($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text());
                //두번째 쓰러트린 핀 개수
                let secondPin = pinCnt - firstPin;
                let sumPin = firstPin + secondPin;


                //스페어처리완료
                if (sumPin == 10) {
                    $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text('/');
                } else {
                    //스페어 처리 실패
                    //console.log('스페어처리 실패 = ' + secondPin);
                    $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text(secondPin);
                }

                //10-2, 10번프레임 점수 추가
                scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][1] = pinCnt;
                scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][3] += secondPin;

                //9번 스트라이크
                if (scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][0] == 10) {

                    scoreBoard[(tenFramePlayerNum - 1) * 10 + 8][3] += secondPin; //9번에 점수 추가

                    //1~9번 프레임 합계 점수 출력
                    let ssssum = 0;
                    for (let i = 0; i < 9; i++) {
                        ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                    }
                    $('#player' + tenFramePlayerNum + '_score9').text(ssssum);
                } else {
                    //9번이 스트라이크가 아님

                }



                //핀 하나라도 남아있는지 확인
                let clearPin = true;
                for (let i = 0; i < pinArray.length; i++) {
                    //남은 핀 개수
                    if (pinArray[i] == true) {
                        clearPin = false;
                    }
                }

                //핀 하나라도 남았을 경우
                if (clearPin == false) {
                    //합계점수출력필요
                    //1~10번 프레임 합계 점수 출력
                    let ssssum = 0;
                    for (let i = 0; i < 10; i++) {
                        ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
                    }
                    $('#player' + tenFramePlayerNum + '_score10').text(ssssum);
                    $('#player' + tenFramePlayerNum + '_totalScore').text(ssssum);

                    //마지막 주자일 경우
                    if (tenFramePlayerNum == $('#playerCount').val()) {
                        $('#bowlingPin').css('display', 'none');
                        //alert('게임이 종료하였습니다.');
                        allData = { 'playerNameList': playerNameList, 'pinBoardFrame[]': pinBoardFrame, 'scoreBoard[]': scoreBoard };
                        ajaxSend(allData);
                    } else {
                        tenFrameFirstSecondThird = 1;
                        tenFramePlayerNum++;
                        for (let i = 0; i < pinArray.length; i++) {
                            pinArray[i] = true;
                        }
                        $('.pin').each(function(index, item) {
                            $(this).prop('checked', false);
                            $(this).attr('disabled', false);
                        });

                    }
                } else {
                    //1번째 0~9점 2번째 스페어
                    tenFrameFirstSecondThird++;
                    //핀 초기화
                    for (let i = 0; i < pinArray.length; i++) {
                        pinArray[i] = true;
                    }
                    $('.pin').each(function(index, item) {
                        $(this).prop('checked', false);
                        $(this).attr('disabled', false);
                    });
                }

            }



        } else if (tenFrameFirstSecondThird == 3) {
            //10번째 프레임의 3번째 투구
            let pinCnt = 0;
            $('.pin').each(function(index, item) {
                if (item.checked == true) {
                    pinCnt += 1;

                    for (let i = 1; i <= 10; i++) {
                        if (item.id == 'pin' + i) {
                            //쓰러트리면 false로 변경
                            if (pinArray[i - 1] == true) {
                                pinArray[i - 1] = false;
                            }
                        }
                    }

                }
            });

            let checkPin = 0;
            for (let i = 0; i < pinArray.length; i++) {
                //남은 핀 개수
                if (pinArray[i] == true) {
                    checkPin += 1;
                }
            }

            if ($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text() == 'X') {
                if ($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text() == 'X') {
                    if (pinCnt == 10) {
                        $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_3').text('X');
                    } else {
                        $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_3').text(pinCnt);
                    }
                } else {

                    //첫번째(이전) 쓰러트린 핀 개수
                    let secondPin = Number($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text());
                    //두번째 쓰러트린 핀 개수
                    let thirdPin = pinCnt - secondPin;

                    //스페어처리완료
                    if ((secondPin + thirdPin) == 10) {
                        $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_3').text('/');
                    } else {
                        //스페어 처리 실패
                        //console.log('스페어처리실패');
                        $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_3').text(thirdPin);
                    }

                }
            } else {
                let firstPin = Number($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_1').text());
                let secondPin = 0;

                //스페어 처리 성공
                if ($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text() == '/') {
                    $('#player' + tenFramePlayerNum + '_frame' + frameNum + '_3').text(pinCnt);
                } else {
                    secondPin = Number($('#player' + tenFramePlayerNum + '_frame' + frameNum + '_2').text());
                }

            }

            //10-3, 10번프레임 점수 추가
            scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][2] = pinCnt;
            scoreBoard[(tenFramePlayerNum - 1) * 10 + 9][3] += pinCnt;

            //합계점수출력필요
            //1~10번 프레임 합계 점수 출력
            let ssssum = 0;
            for (let i = 0; i < 10; i++) {
                ssssum += scoreBoard[(tenFramePlayerNum - 1) * 10 + i][3];
            }
            $('#player' + tenFramePlayerNum + '_score10').text(ssssum);
            $('#player' + tenFramePlayerNum + '_totalScore').text(ssssum);

            if (tenFramePlayerNum == $('#playerCount').val()) {
                $('#bowlingPin').css('display', 'none');
                //alert('게임이 종료하였습니다.');
                allData = { 'playerNameList': playerNameList, 'pinBoardFrame[]': pinBoardFrame, 'scoreBoard[]': scoreBoard };
                ajaxSend(allData);
            } else {
                tenFrameFirstSecondThird = 1;
                tenFramePlayerNum++;
                for (let i = 0; i < pinArray.length; i++) {
                    pinArray[i] = true;
                }
                $('.pin').each(function(index, item) {
                    $(this).prop('checked', false);
                    $(this).attr('disabled', false);
                });

            }

        }

    }



});

// 핀 전부 체크
$('#allCheck').click(function() {
    $('.pin').each(function(index, item) {
        if (!$(item).attr('disabled')) { // pin 체크가 활성화 되어있는경우만
            item.checked = true;
        }
    });
});


function ajaxSend(allData) {

    $.ajax({
        url: './addScoreBoard',
        type: 'GET',
        data: allData,
        success: function() {
            console.log('db전송완료');
        }
    });
}