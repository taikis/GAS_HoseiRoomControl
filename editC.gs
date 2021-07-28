/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {SpreadsheetApp.Sheet} sheetC
 * @param {DataForA} ourRoom
 * @param {DataForA} meetingA
 * @param {DataForA} meetingB
 * @param {Date} dateObj
 */
function editSheetC(ss, sheetC, ourRoom, meetingA, meetingB, dateObj) {
  sheetC.getRange("I1").setValue((dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日");
  /**
   * @param {DataForA} room
   * @param {String} roomName
   */
  var dataCell = sheetC.getRange("A5:I5");
  
  function putIt(room, roomName,dataCell) {
    if (room.num) {
      var tempRaw = [[
        room.chiefName,
        (dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日",
        roomName,
        room.startTime,
        undefined,
        undefined,
        "〜",
        room.finishTime,
        undefined
      ]];
      dataCell.setValues(tempRaw);
      dataCell = dataCell.offset(1, 0);
    }
    return;
  }

  putIt(ourRoom, "部室",dataCell);
  putIt(meetingA, "ミーティングルームA",dataCell);
  putIt(meetingB, "ミーティングルームB",dataCell);
}