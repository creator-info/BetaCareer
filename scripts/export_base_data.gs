function exportBaseDataToCSV() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName('Базовые данные'); // имя листа в твоей таблице
  const values = sheet.getDataRange().getDisplayValues();

  // экранирование значений для CSV
  const esc = s => {
    s = s == null ? '' : String(s);
    if (/[;",\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
    return s;
  };

  const csv = values.map(row => row.map(esc).join(',')).join('\n');

  // создаём CSV на Google Drive
  const fileName = `BaseData_${new Date().toISOString().slice(0,10)}.csv`;
  const file = DriveApp.createFile(fileName, csv, MimeType.CSV);
  Logger.log('CSV создан: ' + file.getUrl());
}
