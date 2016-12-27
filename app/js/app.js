var $         = require("jquery"),
    clipboard = require("clipboard"),
    CURREDIT  = '',
    SCAPE     = [];

$(document).ready(function() {
  //console.groupCollapsed("Emojiscapes comin attcha");

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

  function sizeScape() {
    for(var i = 0; i < NUMROWS; i++) {
      SCAPE[i] = new Array(NUMCOLS);
    }

    return SCAPE;
  }

  function makeScape() {
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

  sizeScape();
  makeScape();

  // ------------------------------------------------------
  // Choose Column Data / Char Modal
  // ------------------------------------------------------

  function openModal() {
    var modal = $('.char-modal');
    modal.addClass('char-modal--show');
  }

  function closeModal() {
    var modal = $('.char-modal');
    modal.removeClass('char-modal--show');
  }

  function changeChar(char) {
    newContent = $(char).html()
    CURREDIT.find('.grid__content').html(newContent);

    closeModal();
  }  

  $('.grid__column').click(function() {
    openModal();
    CURREDIT = $(this);
  });

  $('#char-modal__close').click(function() {
    closeModal();
  })

  $('.char-modal__mojo').click(function() {
    changeChar(this);
    makeScape();
  })

  

  // ------------------------------------------------------
  // Update column data
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

  // ------------------------------------------------------
  // Trigger Copy
  // ------------------------------------------------------

  // update copy content and copy dat
  $('.copy-scape').click(function(e){
    updateData(this);
    copyScape()
  });


// click on gridcolumn -> open modal
// click on modal item -> update content in gridcolumn

});
