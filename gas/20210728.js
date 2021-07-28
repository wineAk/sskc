function onOpen() {
  const ui = SpreadsheetApp.getUi()
  const menu = ui.createMenu('追加メニュー')
  menu.addItem('CSVデータ化する', 'alertBox')
  menu.addToUi()
}

function alertBox(){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getActiveSheet()
  const sheetName = sheet.getSheetName()
  if (/^CSV_/.test(sheetName)) return Browser.msgBox('CSV化したシートでは実行できません。')
  const csvSheet = SpreadsheetApp.getActive().getSheetByName(`CSV_${sheetName}`)
  if (csvSheet) return Browser.msgBox('CSV化したシートがあるため実行できません。削除してから再度お試し下さい。')
  const startRow = Browser.inputBox('「1つ目」の「データの開始行」を半角数字で入力してください。\\n（例）6')
  if (!/^\d+$/.test(startRow) || startRow < 1) return Browser.msgBox('半角数字のみを入力してください')
  const endRow = Browser.inputBox('「1つ目」の「データの終了行」を半角数字で入力してください。\\n（例）11')
  if (!/^\d+$/.test(endRow) || endRow < 1) return Browser.msgBox('半角数字のみを入力してください。')
  const text = `データの開始 ${startRow}行目\\nデータの終了 ${endRow}行目\\nで処理します。よろしいですか？`
  const isRun = Browser.msgBox('確認', text, Browser.Buttons.OK_CANCEL)
  if (isRun === 'ok') dataFunction(spreadsheet, startRow, endRow)
}

function dataFunction(spreadsheet, startRow, endRow) {
  const sheet = spreadsheet.getActiveSheet()
  const sheetName = sheet.getSheetName()
  const values = sheet.getRange('A1:ZZ').getValues()
  const diffRow = endRow - startRow + 1
  for (let i = 0, n = startRow-1; i < n; i++) values.shift()
  let newValues = [], titleArray = [], valueArray = []
  values.forEach((v, i) => {
    const j = i + 1
    const isOdd = ((j % 2) !== 0 )
    if (isOdd) titleArray = titleArray.concat(v)
    if (!isOdd) valueArray = valueArray.concat(v)
    if ( (j % diffRow) === 0 ) {
      if (j === diffRow) newValues.push(titleArray)
      newValues.push(valueArray)
      titleArray = [], valueArray = []
    }
  })
  const newSheet = spreadsheet.insertSheet()
  newSheet.setName(`CSV_${sheetName}`)
  newSheet.getRange(1,1,newValues.length,newValues[0].length).setValues(newValues)
}