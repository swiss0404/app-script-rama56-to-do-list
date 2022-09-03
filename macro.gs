/** @OnlyCurrentDoc */
function scheduleShifts() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var mustDoSheet = spreadsheet.getSheets()[1];
  var calendarID = 'eohsuefdl4sqe5gv4dgv1l9ujs@group.calendar.google.com';
  var eventCal = CalendarApp.getCalendarById(calendarID);
  var now = new Date();
  var yearafter = new Date(now.getTime() + (12 * 30 * 24 * 60 * 60 * 1000));
  var yearbefore = new Date(now.getTime() - (12 * 30 * 24 * 60 * 60 * 1000));
  var events = eventCal.getEvents(yearbefore, yearafter);
  var createdEvents = []
  var endTimeCreatedEvents = []
  for (x = 0; x < events.length;x++){
    createdEvents.push(events[x].getTitle())
    endTimeCreatedEvents.push(events[x].getEndTime())
  }
  
  
  var signups = spreadsheet.setActiveSheet(mustDoSheet).getRange("C2:E100").getValues();
  for (x=0; x<signups.length;x++)
  {
    if (signups[x][0] != "" && signups[x][2] != "" ){
      var shift = signups[x];
      var startTime = shift[2];
      var endTime = shift[2];
      var title = shift[0];
      if(!(createdEvents.includes(title) || createdEvents.includes(endTime))){
        console.log(title)
        eventCal.createEvent(title, startTime, endTime);
      }
      else(
        console.log('created')
      )
    }
  }
}
