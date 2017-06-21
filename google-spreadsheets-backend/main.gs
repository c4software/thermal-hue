function doGet(e) {  
  var status = "1";
  var rowData = [];
  var data = []

  if (e == undefined || e.parameters == undefined) {
      status = "No parameters";
  }
  else {    
    var sheetName = e.parameter["sn"]?e.parameter["sn"]:"Data"; // SheetName can be pass througth the url
    var id = 'YOUR_GOOGLE_SHEET_ID'; // Spreadsheet id
    var sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
    
    for (var param in e.parameter) {
      var value = e.parameter[param].replace(/^["']|['"]$/g, "");
      switch (param) {
        case "pushData":
          data = add_data(sheet, value.split(","));
          break;
        case 'get':
          data = create_data_return(sheet);
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

// Get last Inserted values
function get_last_value(sheet){
  var dataRange = sheet.getRange("A2:B2");
  return dataRange.getValues();
}

// Get the next to values.
function get_nextto_value(sheet){
  var dataRange = sheet.getRange("A3:B3");
  return dataRange.getValues();
}

function get_history_range(sheet){
  var dataRange = sheet.getRange("A2:B100").getValues().reverse();
  var dataReturn = [];
  for (i in dataRange){
    item = dataRange[i];
    dataReturn.push({key: item[0].replace(/:/, " "), value: item[1]});
  }
  
  return dataReturn;
}

function create_data_return(sheet){
  last = get_last_value(sheet);
  nextto = get_nextto_value(sheet);
  trend = "";
  
  last_value = last[0][1].toFixed(1);
  nextto_value = nextto[0][1].toFixed(1);
  
  if (last_value > nextto_value){
    trend = "+";
  }else if (last_value < nextto_value){
    trend = "-";  
  }else{
    trend = "=";
  }
  
  var data = {
    "last": {
      "value": last[0][1],
      "date": last[0][0]
    },
    history: get_history_range(sheet),
    "trend": trend
  };
  
  return data;
}

function make_return(status, data){
  result = {
    "status": status,
    "data": data
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
