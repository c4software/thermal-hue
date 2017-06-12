function doGet(e) {  
  var status = "1";
  var rowData = [];
  var data = []

  if (e == undefined || e.parameters == undefined) {
      status = "No parameters";
  }
  else {
    var id = 'YOUR-GOOGLE-SPREADSHEET-ID'; // Spreadsheet id
    var sheet = SpreadsheetApp.openById(id).getSheetByName("Data");
    
    for (var param in e.parameter) {
      var value = e.parameter[param].replace(/^["']|['"]$/g, "");
      switch (param) {
        case "pushData":
          data = add_data(sheet, value.split(","));
          break;
        case 'getLast':
          data = get_values(sheet);
          break;
        default:
          status = "0";
      }
    }
  }

  // Return result of operation
  return make_return(status, data);
}

function add_data(sheet, rowData){
  // Write new row to spreadsheet
  sheet.insertRows(2);
  var newRange = sheet.getRange(2, 1, 1, rowData.length);
  newRange.setValues([rowData]);
  return rowData;
}

function get_values(sheet){
  // Get last Inserted values
  var dataRange = sheet.getRange("A2:B2");
  return dataRange.getValues();
}

function make_return(status, data){
  result = {
    "status": status,
    "data": data
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
