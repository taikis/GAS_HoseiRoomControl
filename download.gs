function downloadAsExcel() {
  var date = new Date();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetA = ss.getSheetByName("（提出）課外活動報告書");
  var sheetBs = [];
  var i = 0;
  while (true) {
    var temp = ss.getSheetByName("（提出）参加者名簿" + i++)
    if (temp) {
      sheetBs.push(temp);
    } else {
      break;
    }
  }
  var sheetC = ss.getSheetByName("（提出）換気時間記録表");

  if (!(sheetA && sheetC && sheetBs.length)) {
    Browser.msgBox("データがありません。\\n終了します。");
    return;
  }

  var copySS = SpreadsheetApp.create("課外活動・施設利用報告書_"+
  Utilities.formatDate(sheetA.getRange("C11").getValue(),"JST","yyyyMMdd"));

  sheetA.copyTo(copySS).setName("（提出）課外活動報告書");
  copySS.deleteSheet(copySS.getSheetByName("シート1"));
  i=0;
  for (var sheetB of sheetBs) {
    sheetB.copyTo(copySS).setName("（提出）参加者名簿"+i++);
  }
  sheetC.copyTo(copySS).setName("（提出）換気時間記録表");

  var sheetD = ss.getSheetByName("実行確認");
  var lastRow = sheetD.getLastRow()
  console.log(lastRow)
  sheetD.getRange(lastRow+1,1).setValue(Utilities.formatDate(date,"JST", "yyyy/MM/dd HH:mm:ss"));

  var downloadURL = "https://docs.google.com/spreadsheets/d/"+ copySS.getId() +"/export?format=xlsx";
  
  var script = "<script>window.open('" + downloadURL + "', '_blank').focus()</script>";
  var html = HtmlService.createHtmlOutput(script);

  SpreadsheetApp.getUi().showModalDialog(html, "ダウンロードしたら×ボタンで閉じてね");
}

function createSpreadsheetInfolder(folderID, fileName) {
  var folder = DriveApp.getFolderById(folderID);
  var newSS=SpreadsheetApp.create(fileName);
  var originalFile=DriveApp.getFileById(newSS.getId());
  var copiedFile = originalFile.makeCopy(fileName, folder);
  DriveApp.getRootFolder().removeFile(originalFile);
  return copiedFile;
}