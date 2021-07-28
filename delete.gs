function deletePast() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  destroyer(ss, "（提出）課外活動報告書");
  destroyer(ss, "（提出）参加者名簿");
  destroyer(ss, "（提出）換気時間記録表");
  destroyer(ss, "原本課外活動報告書 のコピー");
  var i = 0;
  while (ss.getSheetByName("（提出）参加者名簿" + i)) {
    destroyer(ss, "（提出）参加者名簿" + i++);
  }
}
/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {String} name
 */
function destroyer(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
}