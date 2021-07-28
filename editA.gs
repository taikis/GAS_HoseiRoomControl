/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {SpreadsheetApp.Sheet} sheetA 
 * @param {DataForA} ourRoom
 * @param {DataForA} meetingA
 * @param {DataForA} meetingB
 * @param {Date} dateObj
 */
function editSheetA(ss, sheetA, ourRoom, meetingA, meetingB, dateObj) {
  sheetA.getRange("C11").setValue((dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日");
  var numCell = sheetA.getRange("D15");
  var noteCell = sheetA.getRange("D20");
  var nameCell = sheetA.getRange("E16");
  var startCell = sheetA.getRange("E17");
  var endCell = sheetA.getRange("E18");

  //console.log(meetingA.num + "  " + meetingB.num)
  /**
   *  @param {DataForA} room
   *  @param {String} roomName
  */
  function putIt(room, roomName) {
    if (room.num) {
      numCell.setValue(room.num);
      nameCell.setValue(roomName);
      if(room.num>6){
        noteCell.setValue(getNote7())
      }
      startCell.setValue(room.startTime);
      endCell.setValue(room.finishTime);
      numCell = numCell.offset(6, 0);
      nameCell = nameCell.offset(6, 0);
      startCell = startCell.offset(6, 0);
      endCell = endCell.offset(6, 0);
    }
  }

  putIt(ourRoom, "部室");
  putIt(meetingA, "ミーティングルームA");
  putIt(meetingB, "ミーティングルームB");

}