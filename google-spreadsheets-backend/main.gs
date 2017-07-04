function doGet(e) {  
  var status = "1";
  var rowData = [];
  var data = []

  if (e == undefined || e.parameters == undefined) {
      status = "No parameters";
  }
  else {    
    var sheetName = e.parameter["sn"]?e.parameter["sn"]:"Salon"; // SheetName can be pass througth the url
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    var data = {};
    
    if("pushData" in e.parameter){
      var value = e.parameter["pushData"].replace(/^["']|['"]$/g, "");
      data = add_data(sheet, value.split(","));
    }else if ("get" in e.parameter){
      data = create_data_return(sheet);
    }else if ("getMultiple" in e.parameter){
      var value = e.parameter["getmultiple"].replace(/^["']|['"]$/g, "");
      var sns = value.split(",");
      for (var sheetName in sns){
        sheetName = sns[sheetName];
        sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        data[sheetName] = create_data_return(sheet);
      }
    }else if("getSheetsName" in e.parameter){
      data = get_all_sheetsName();
    }else{
      status = 0;
    }
  }

  // Return result of operation
  return make_return(status, data);
}

function get_all_sheetsName(){
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var data = []
  
  for (var s in sheets){
    var sheetName = sheets[s].getName();
    if (sheetName.indexOf("_") !== 0){
      data.push(sheetName);
    }
  }
  
  return data;
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
  // Get last value in the selected sheet
  last = get_last_value(sheet);
  
  // Get the n-1 value
  nextto = get_nextto_value(sheet);
  trend = "";
  
  // Get and format value
  last_value = last[0][1].toFixed(1);
  nextto_value = nextto[0][1].toFixed(1);
  
  // Calculate the trend
  if (last_value > nextto_value){
    trend = "+";
  }else if (last_value < nextto_value){
    trend = "-";  
  }else{
    trend = "=";
  }
  
  // Format data 
  var data = {
    "last": {
      "value": last[0][1],
      "date": last[0][0]
    },
    "trend": trend,
    "history": get_history_range(sheet) // Get the history for the sheets
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
