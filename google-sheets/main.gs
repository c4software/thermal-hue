function doGet(e) {  
  var result = "";
  var rowData = [];

  if (e == undefined || e.parameters == undefined) {
      result = "No parameters";
  }
  else {
    var id = 'YOUR-GOOGLE-SPREADSHEET-ID'; // Spreadsheet id
    var sheet = SpreadsheetApp.openById(id).getSheetByName("Data");
    
    for (var param in e.parameter) {
      var value = e.parameter[param].replace(/^["']|['"]$/g, "");
      switch (param) {
        case 'col1': 
          rowData[0] = value;
          break;
        case 'col2':
          rowData[1] = value;
          break;
        case 'getLast':
          result = JSON.stringify(get_values(sheet));
          break;
        default:
          result = "";
      }
    }
    
    if (rowData.length >= 1){
      add_data(rowData);
    }
  }

  // Return result of operation
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

function add_data(rowData){
  // Write new row to spreadsheet
  sheet.insertRows(2);
  var newRange = sheet.getRange(2, 1, 1, rowData.length);
  newRange.setValues([rowData]);
}

function get_values(sheet){
  // Get last Inserted values
  var dataRange = sheet.getRange("A2:B2");
  return dataRange.getValues();
}
