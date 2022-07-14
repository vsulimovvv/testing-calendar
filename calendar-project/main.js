// *Zabuto  Calendar
const eventData = [
  {
    date: '2022-07-20',
    badge: true,
    classname: 'newbies',
    title: 'Для новичков',
    time: '15:00',
  },
  {
    date: '2022-07-17',
    badge: true,
    classname: 'school-business',
    title: 'Школа бизнеса',
    time: '18:00',
  },
  {
    date: '2022-07-22',
    badge: true,
    classname: 'out-town',
    title: 'Выезд за город',
    time: '21:00',
  },
];

function myDateFunction(id, fromModal) {
  $('#date-popover').hide();
  if (fromModal) {
    $('#' + id + '_modal').modal('hide');
  }
  var title = $('#' + id).attr('title');

  var time = '';
  $.each(eventData, function (id, data) {
    console.log(id);
    $.each(data, function (index, value) {
      if (index === 'time') {
        time = value;
      }
    });
  });
  console.log(time);

  if (fromModal) {
    $('#' + id + '_modal').modal('hide');
  }

  $('#date-popover-content').html(time + '<br />' + title);
  $('#date-popover').show();
  return true;
}

$('#calendar').zabuto_calendar({
  language: 'ru',
  data: eventData,
  nav_icon: {
    prev: '<i class="fa fa-chevron-left"></i>',
    next: '<i class="fa fa-chevron-right"></i>',
  },

  action: function () {
    return myDateFunction(this.id);
  },

  legend: [
    {
      type: 'text',
      label: 'Школа бизнеса',
      badge: '',
      classname: 'school-business',
    },
    { type: 'text', label: 'Для новичков', badge: '', classname: 'newbies' },
    {
      type: 'text',
      label: 'Выезд за город',
      badge: '',
      classname: 'out-town',
    },
  ],
});
