/**
 * @param {number} date 何日前かを表す引数
 */
function createReport(date = 0) {
  deletePast();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dateObj = new Date();

  var sheetA, sheetB, sheetC;


  dateObj.setDate(dateObj.getDate() - date);
  var ourRoom = new DataForA();
  var meetingA = new DataForA();
  var meetingB = new DataForA();

  [sheetA, sheetB, sheetC] = copySheet(ss, dateObj);
  [ourRoom, meetingA, meetingB] = editSheetB(ss, sheetB, dateObj);

  editSheetA(ss, sheetA, ourRoom, meetingA, meetingB, dateObj);
  editSheetC(ss, sheetC, ourRoom, meetingA, meetingB, dateObj);
}

function copySheet(ss, dateObj) {
  sheetA = ss.getSheetByName("原本課外活動報告書").copyTo(ss).setName("（提出）課外活動報告書").setTabColor("0000ff");
  sheetB = ss.getSheetByName("原本参加者名簿").copyTo(ss).setName("（提出）参加者名簿").setTabColor("00ff00");
  sheetC = ss.getSheetByName("原本換気時間記録表").copyTo(ss).setName("（提出）換気時間記録表").setTabColor("0000ff");
  return [sheetA, sheetB, sheetC];
}
