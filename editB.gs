function editSheetB(ss, sheetB, dateObj) {

  sheetB.getRange("J2").setValue(dateObj.getFullYear() + "年");
  sheetB.getRange("K2").setValue((dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日");


  var ourRoom = new DataForA();
  var meetingA = new DataForA();
  var meetingB = new DataForA();

  class NameManager {
    constructor(enterList) {
      this.number = enterList[1];
      this.name = enterList[2];
      this.placeName = ["部室"];
      this.enterTime = [enterList[0]];
      this.endTime = [];
      ourRoom.num++;
      ourRoom.setStartTime(this.enterTime[0]);
      if (!ourRoom.chiefName) {
            ourRoom.setChiefName(this.name);
          }
    }
    searchByNumber(list) {
      /**
       * @type {Array}
       */
      const nameList = list;
      for (var i = 0; i < nameList.length; ++i) {
        if (nameList[i][3] == this.number) {
          this.faculty = nameList[i][1];
          this.department = nameList[i][2]
          break;
        }
      }
    }

    putEndTime(time) {
      this.endTime[0] = time;
      ourRoom.setEndTime(this.endTime[0]);

    }

    putMeetingTimes(enter, end, place) {
      var whereNum;
      whereNum = this.placeName.push(place) - 1;
      this.enterTime[whereNum] = enter;
      this.endTime[whereNum] = end;
      switch (place) {
        case "ミーティングルームA":
          meetingA.num++;
          meetingA.setStartTime(this.enterTime[whereNum]);
          meetingA.setEndTime(this.endTime[whereNum]);
          if (!meetingA.chiefName) {
            meetingA.setChiefName(this.name);
          }
          break;
        case "ミーティングルームB":
          meetingB.num++;
          meetingB.setStartTime(this.enterTime[whereNum]);
          meetingB.setEndTime(this.endTime[whereNum]);
          if (!meetingB.chiefName) {
            meetingB.setChiefName(this.name);
          }

          break;
      }

    }

    outputAsArray() {
      /**
       * @param {Date} enter
       * @param {Date} end
       */
      const timeFormatter = function (enter, end) {
        var enterAsDate = new Date(enter);
        var endAsDate = new Date(end);
        if (enter) {
          return (enterAsDate.getHours() + ":" + enterAsDate.getMinutes() + "〜" + endAsDate.getHours() + ":" + endAsDate.getMinutes());
        } else {
          return undefined;
        }
      }
      return [
        this.name,
        this.faculty,
        this.department,
        this.number,
        this.placeName[0],
        timeFormatter(this.enterTime[0], this.endTime[0]),
        this.placeName[1],
        timeFormatter(this.enterTime[1], this.endTime[1]),
        this.placeName[2],
        timeFormatter(this.enterTime[2], this.endTime[2]),
      ]
    }
  }

  class LogManager {
    constructor(logList) {
      var temp = [];
      this.menberNum = 0;
      logList.shift();
      for (var raw of logList) {
        if (raw[0].getDate() == dateObj.getDate()&&
        raw[0].getFullYear() == dateObj.getFullYear()&&
        raw[0].getMonth() == dateObj.getMonth()) {
          temp.push(raw)
          this.menberNum++;
        }
      }
      this.log = temp;
    }
  }
  //シートからデータ取得
  var nameList = ss.getSheetByName("部員名簿整形").getDataRange().getValues();
  var enterLog = new LogManager(ss.getSheetByName("部室入室").getDataRange().getValues());
  var exitLog = new LogManager(ss.getSheetByName("部室退室").getDataRange().getValues());
  var otherLog = new LogManager(ss.getSheetByName("ミーティング").getDataRange().getValues());

  var dataTemp = [];
  //入室記録からリスト作成
  for (var log of enterLog.log) {
    dataTemp.push(new NameManager(log));
  }
  //リストの学部学科を補完
  for (var name of dataTemp) {
    name.searchByNumber(nameList);
  }
  //帰宅記録を追加
  for (var log of exitLog.log) {
    for (var name of dataTemp) {
      if (log[1] == name.number) {
        name.putEndTime(log[0]);
      }
    }
  }
  //ミーティングルームの結果があれば記録
  for (var log of otherLog.log) {
    for (var name of dataTemp) {
      if (log[3] == name.number) {
        name.putMeetingTimes(log[2], log[0], log[1]);
      }
    }
  }
  //20行ずつに分割
  //全てを一旦リスト化
  var todaysMenbersAll = [];
  for (var name of dataTemp) {
    //console.log(name.outputAsArray());
    todaysMenbersAll.push(name.outputAsArray());
  }
  var todaysMenbers = [];
  var tempMenber = [];
  var countMenber = 0;
  while (countMenber < todaysMenbersAll.length) {
    while ( ((countMenber % 20 != 0) || countMenber == 0) && (countMenber < todaysMenbersAll.length) ) {
      tempMenber.push(todaysMenbersAll[countMenber]);
      ++countMenber;
    }
    ++countMenber;
    todaysMenbers.push(tempMenber);
    tempMenber = []

  }
  //20行ごとにシートを複製
  for (var i in todaysMenbers) {
    var sheetBChild = sheetB.copyTo(ss).setName("（提出）参加者名簿" + i).setTabColor("0000ff");
    sheetBChild.getRange(6, 2, todaysMenbers[i].length, todaysMenbers[i][0].length).setValues(todaysMenbers[i])
  }
  return [ourRoom, meetingA, meetingB];
}
