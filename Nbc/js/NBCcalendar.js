$(document).ready(function() {
  loadCalendar(new Date());
});

function loadCalendar(aDate) {
  if (aDate > maxDate()) {
    aDate = new Date(maxDate());
  }
  if (aDate < minDate()) {
    aDate = new Date(minDate());
  }
  monthData = buildCalendarData(aDate);
  $('#nbcCalendar').addClass('row');
  $('#nbcCalendar').html(rawTable(monthData));
  $('#nextMonth').click(nextMonth);
  $('#prevMonth').click(prevMonth);
}

function nextMonth() {
  $('#nextMonth').unbind();
  currentMonth = new Date(Number($('#nbcCalendar table').attr('showingMonth')));
  y = currentMonth.getFullYear()
  m = currentMonth.getMonth();
  next = new Date(y, m + 1, 1);
  loadCalendar(next);
}

function prevMonth() {
  currentMonth = new Date(Number($('#nbcCalendar table').attr('showingMonth')));
  y = currentMonth.getFullYear()
  m = currentMonth.getMonth();
  last = new Date(y, m, -1);
  loadCalendar(last);
}

function rawTable(monthData) {

  var table ='';
  table += '<table showingMonth="' + monthData.firstday + '">';
  table += '<tr class="nbcMonthName">';
  table += navButton('prev', monthData.firstday);
  table += '<th colspan="5">' + monthData.title + '</th>';
  table += navButton('next', monthData.firstday);
  table += '</tr>';
  table += '<tr class="nbcDayNames">';
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (col = 0; col <= 6; col++) {
    table += '<th>' + dayNames[col] + '</th>';
  }
  table += '</tr>';
  rows = monthData.days.length / 7;
  for (row = 1; row <= rows; row++) {
    table += renderWeekRow(monthData,row);
  }
  table += '</table>';
  return table;
}

function navButton(direction, monthRendering) {
  currentMonth = new Date(Number(monthRendering));
  if (direction == 'prev' && currentMonth.toDateString() != minDate().toDateString()) {
    return '<th><span id="prevMonth">&lt;&lt;&lt;</span></th>'
  }
  y = maxDate().getFullYear()
  m = maxDate().getMonth();
  maxTestDate = new Date(y, m, 1);
  if (direction == 'next' && currentMonth.toDateString() != maxTestDate.toDateString()) {
    return '<th><span id="nextMonth">&gt;&gt;&gt;</span></th>'
  }
  return "<th></th>";
}

function renderWeekRow(monthData, row) {
  from = (row-1) * 7;
  row = '<tr class="nbcCalendarRow">';
  for (col = 0; col <= 6; col++) {
    row += calendarDay(monthData.days[from + col]);
  }
  row += '</tr>';
  return row;
}

function calendarDay(day) {
  if (day === null) {
    className = 'nbcEmpty';
    dayOfMonth = '';
    contents = '';
  }
  else {
    className = getDateClass(day);
    dayOfMonth = '<div class="nbcDate">' + day.getDate() + '</div>';
    if (isVariablePricingDate(day)) {
      contents = '<div class="pick_day"><div>Adult -- $24.99</div><div>Child -- $15.99</div></div>'
    }
    else {
      contents = '<div class="pick_day"><div>Adult -- $22.99</div><div>Child -- $14.99</div></div>'
    }
  }
  return '<td class="' + className  + '">' + dayOfMonth + contents + ' </td>';
}

function getDateClass(day) {
  now = new Date();
  if (day.toDateString() == now.toDateString()) {
    return 'nbcToday';
  }
  if (day < now) {
    return 'nbcPastDay';
  }
  if (day > now) {
    return 'nbcFutureDay';
  }
}

function buildCalendarData(aDate) {
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  y = aDate.getFullYear()
  m = aDate.getMonth();
  firstday = new Date(y, m, 1);
  lastDay = new Date(y, m + 1, 0);
  startsOn = firstday.getDay();
  daysInMonth = 31;
  days = [];
  for (i=1; i<= startsOn; i++) {
    days.push(null);
  }
  currentDate = new Date(firstday);
  while (currentDate <= lastDay) {
        days.push( new Date (currentDate) )
        currentDate.setDate(currentDate.getDate() + 1);
  }
  while (days.length % 7 !== 0)  {
    days.push(null);
  }
  title = months[firstday.getMonth()] + ' ' + firstday.getFullYear();
  return {
    firstday: firstday.getTime(),
    title : title,
    days : days,
  };
}

function isVariablePricingDate(day) {
  if (day.getMonth() == 4) { // May
    if ([27,28].includes(day.getDate())) {
      return true;
    }
  }
  if (day.getMonth() == 5) { // June
    if ([10, 11, 17, 18, 24, 25].includes(day.getDate())) {
      return true;
    }
  }
  if (day.getMonth() == 6) { // July
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29, 30].includes(day.getDate())) {
      return true;
    }
  }
  if (day.getMonth() == 7) { // August
    if ([4, 5, 6, 11, 12, 13].includes(day.getDate())) {
      return true;
    }
  }
  return false;
}

function minDate() {
  return new Date('05-01-2017');
}

function maxDate() {
  return new Date('08-31-2017');
}
