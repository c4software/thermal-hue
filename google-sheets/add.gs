function doGet(e) {  
  var result = 'Ok'; // assume success
  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = 'REPLACE-BY-YOUR-SPREADSHEET-ID'; // Spreadsheet id
    var sheet = SpreadsheetApp.openById(id).getSheetByName("Data");
    sheet.insertRows(2);
    var rowData = [];
    for (var param in e.parameter) {
      var value = stripQuotes(e.parameter[param]);
      switch (param) {
        case 'col1': 
          rowData[0] = value;
          break;
        case 'col2':
          rowData[1] = value;
          break;
        default:
          result = "unsupported parameter";
      }
    }
    // Write new row to spreadsheet
    var newRange = sheet.getRange(2, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}

/**
 * Remove leading and trailing single or double quotes
 */
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
