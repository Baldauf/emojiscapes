var $ = require("jquery"),
    SCAPE = [];

$(document).ready(function() {
    //console.groupCollapsed("Loading Emojiscapes...");
// array to track copied

function makeScape(numRows) {
  var rows = 0,
      row = $('.grid__row');

  row.each(function() {
    var that = $(this).find('.grid__content').html();
    SCAPE.push(that);
  });

  return SCAPE;
}

function makeExport(scape) {
  var blerg = scape.toString();
  console.log(blerg)
}

makeScape(numRows);
var copy = makeExport(SCAPE);

function numRows() {
  var x = 0,
      row = $('.grid__row');
  row.each(function() {
    x += 1;
  });

  return x;
}

function sizeRows(num) {
  var row = $('.grid__row');
  row.css( "height", "calc(" + 100 / num + "% - 10px)" );
}

function numCols() {
  var x = 0;
  $('.grid__row--a').find('.grid__column').each(function() {
    x += 1;
  });

  return x;
}

// size things:
var numRows = numRows(),
    sizeRows = sizeRows(numRows),
    numCols = numCols();

// click on gridcolumn -> open modal

// click on modal item -> update content in gridcolumn

});
