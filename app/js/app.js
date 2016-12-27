var $         = require("jquery"),
    clipboard = require("clipboard"),
    SCAPE     = [];

$(document).ready(function() {
  //console.groupCollapsed("Emojiscapes comin attcha");
  // array to track copied

  // ------------------------------------------------------
  // GET row/column data
  // ------------------------------------------------------

  function numRows() {
    var x = 0,
        row = $('.grid__row');
    row.each(function() {
      x += 1;
    });

    console.log('There are now ' + x + ' rows');

    return x;
  }

  function numCols() {
    var x = 0;
    $('.grid__row--a').find('.grid__column').each(function() {
      x += 1;
    });

    console.log('There are now ' + x + ' columns');

    return x;
  }

  var NUMROWS = numRows(),
      NUMCOLS = numCols();


  // ------------------------------------------------------
  // SIZE row/columns
  // ------------------------------------------------------

  function sizeRows(num) {
    var row = $('.grid__row');
    row.css( "height", "calc(" + 100 / num + "% - 10px)" );
  }

  var SIZEROWS = sizeRows(NUMROWS);


  // ------------------------------------------------------
  // STORE column data
  // ------------------------------------------------------

  function sizeScape(NUMROWS, NUMCOLS) {
    for(var i = 0; i < NUMROWS; i++) {
      SCAPE[i] = new Array(NUMCOLS);
    }

    return SCAPE;
  }

  function makeScape(NUMROWS, NUMCOLS) {
    var currRow = 0,
        currCol = 0;
        row = $('.grid__row'),
        column = '.grid__column';

    row.each(function(i, v) {
      var cols = $(this).find(column);

      $.each(cols, function(i, v) {
        var char = $(this).find('.grid__content').html();
        SCAPE[currRow][currCol] = char;
        currCol += 1;
      });

      currCol = 0;      
      currRow += 1;
    });

    console.log(SCAPE)

    return SCAPE;
  }

  sizeScape(NUMROWS, NUMCOLS);
  makeScape(NUMROWS, NUMCOLS);

  // ------------------------------------------------------
  // Update Copy Data
  // ------------------------------------------------------


  // ------------------------------------------------------
  // Copy dat
  // ------------------------------------------------------

  // Chunk String at num columns
  function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret;
  };

  // Send scape to string and parse fmt
  function createExport(scape) {
    var stringScape = scape.toString().replace(/,/g, '');

    stringScape = chunk(stringScape, NUMCOLS * 2).join('\n');

    return stringScape;
  }

  // update dom data for copying from scape string
  function updateData(self) {
    var copy = createExport(SCAPE);
    $(self).attr('data-clipboard-text', copy);

    return self;
  }

  // create copy obj and copy
  function copyScape() {
    clip = new clipboard('.copy-scape');
    clip.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
      e.clearSelection();
    });

    clip.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }

  // update copy content and copy dat
  $('.copy-scape').click(function(e){
    updateData(this);
    copyScape()
  });

// newline  + rm commas in copy export
// click on gridcolumn -> open modal
// click on modal item -> update content in gridcolumn

});
