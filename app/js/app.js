var $         = require("jquery"),
    clipboard = require("clipboard"),
    CURREDIT  = '',
    SCAPE     = [],
    NUMROWS   = 0,
    NUMCOLS   = 0;

function Emojiscape() {
  // ------------------------------------------------------
  // SIZE row/columns
  // ------------------------------------------------------

  function sizeThings() {
    var row       = $('.grid__row'),
        col       = $('.grid__column'),
        chars     = $('.grid__content'),
        colWidth  = 0;
        colHeight = 0;

    row.css( "height", "calc(" + 100 / NUMROWS + "% - 10px)" );

    colHeight = row.height();
    colWidth = colHeight + 'px';
    col.css("width", colWidth);
    chars.css("font-size", colHeight / 4 + 'px');
  }

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

  // create the array size from initial vals
  function sizeScape() {
    for(var i = 0; i < NUMROWS; i++) {
      SCAPE[i] = new Array(i);
      var scape = SCAPE[i];
      for(j = 0; j < NUMCOLS; j++) {
        SCAPE[i][j] = j;
      }
    }

    console.log(SCAPE)

    return SCAPE;
  }

  function buildScape() {
    var gridContent = '',
        currCol = 0;
        row = 'grid__row',
        column = 'grid__column';

    for(var currRow = 0; currRow < NUMROWS; currRow++) {
      gridContent += '<div class="grid__row">';

      for(var currCol = 0; currCol < NUMCOLS; currCol++) {
        gridContent += '<div class="grid__column"><div class="grid__content"></div></div>';
      }
      gridContent += '</div>';
    }

    return gridContent;
  }

  function buildPage() {
    var page = $('.page'),
        grid = $('.grid');
    page.removeClass('page--prep');
    grid.html(buildScape());
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

  // ------------------------------------------------------
  // BUILD row/column data
  // ------------------------------------------------------
  function buildRows() {
    var setRows = $('#scape-create__rows').find('input'),
        setRowsVal = setRows.attr('placeholder');

    if (setRows.val() != ''){
        setRowsVal = setRows.val();
    }

    console.log('There are now ' + setRowsVal + ' rows');

    return setRowsVal;
  }

  function buildCols() {
    var setCols = $('#scape-create__columns').find('input'),
        setColsVal = setCols.attr('placeholder');

    if (setCols.val() != ''){
        setColsVal = setCols.val();
    }

    console.log('There are now ' + setColsVal + ' columns');
    
    return setColsVal;
  }

  // ------------------------------------------------------
  // GET row/column data
  // ------------------------------------------------------

  // var NUMROWS = numRows(),
  //     NUMCOLS = numCols();


  // ------------------------------------------------------
  // STORE column data
  // ------------------------------------------------------

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

  function flashCopyBtn(e) {
    var btn  = $('.copy-scape'),
        clas = 'copy-scape--copied';

    btn.addClass(clas);

    setTimeout(function() {
      btn.removeClass(clas);
    }, 2000);
  }

  $(document).ready(function() {
    //console.groupCollapsed("Emojiscapes comin attcha");
    
    $('.scape-create__btn').click(function(){
      NUMROWS  = buildRows();
      NUMCOLS  = buildCols();

      sizeScape();
      buildPage();
      sizeThings();
    });

    $('.grid__column').on("click", function() {
      console.log('clickety')
      openModal();
      CURREDIT = $(this);
    });

    $('#char-modal__close').click(function() {
      closeModal();
    });

    $('.char-modal__mojo').click(function() {
      changeChar(this);
      makeScape();
    });

    // Modal Search
    $('#search').keyup(function() {
      var keyword = $(this).val().toLowerCase();

      // rebuild on keystroke
      $('.category').removeClass('category--hide');

      // simple search toggle
      $('.char-modal__mojo').each( function() {
        $(this).toggle( keyword.length < 1 || $(this).attr('data-models').indexOf(keyword) > -1 );
      });

      // hide categories if no results
      $('.char').each( function() {
        if($(this).children(':visible').length == 0) {
          $(this).parent().addClass('category--hide');
        } else {
          $(this).parent().removeClass('category--hide');
        }
      })
    });

    // ------------------------------------------------------
    // Trigger Copy
    // ------------------------------------------------------

    // update copy content and copy dat
    $('.copy-scape').click(function(e){
      updateData(this);
      copyScape();
      flashCopyBtn(this);
    });

  // resize rows / columns
  // add/rm rows/cols

  });

} // END OF EMOJISCAPE OBJECT

window.mr_scape = new Emojiscape();
