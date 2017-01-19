var $         = require("jquery"),
    clipboard = require("clipboard"),
    PAGE      = $('.page'),
    GRID      = $('.grid'),
    CURREDIT  = '',
    SCAPE     = [],
    NUMROWS   = 0,
    NUMCOLS   = 0,
    TEMPLATE  = '';

function Emojiscape() {
  //console.groupCollapsed("Emojiscapes..ooh what fun");
  // ------------------------------------------------------
  // SIZE row/columns
  // ------------------------------------------------------

  function sizeThings() {
    var grid      = $('.grid'),
        row       = $('.grid__row'),
        col       = $('.grid__column'),
        chars     = $('.grid__content'),
        rowHMax = grid.height() / NUMROWS - 10,
        colWMax = grid.width() / NUMCOLS - 10,
        size = Math.min(rowHMax, colWMax);

    row.css( "height", size + "px" );
    col.css("width", size + "px");
    col.css ("height", size + "px");
    chars.css("font-size", size / 4 + 'px');
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
    $('.grid__row:first-child').find('.grid__column').each(function() {
      x += 1;
    });

    console.log('There are now ' + x + ' columns');

    return x;
  }

  function chooseTemplate(btn) {
    TEMPLATE = $(btn).attr("class").split('--')[1];
  }

  // create the array size from initial vals
  function sizeScape() {
    for(var i = 0; i < NUMROWS; i++) {
      SCAPE[i] = new Array(i);
      var scape = SCAPE[i];
    }

    switch(true) {
      case TEMPLATE == 'beach':
        SCAPE[0][0] = "⬜";
        SCAPE[0][1] = "⬜";
        SCAPE[0][2] = "🌞";
        SCAPE[0][3] = "⬜";

        SCAPE[1][0] = "🌴";
        SCAPE[1][1] = "⛱";
        SCAPE[1][2] = "🌴";
        SCAPE[1][3] = "🌴";

        SCAPE[2][0] = "🌊";
        SCAPE[2][1] = "🌊";
        SCAPE[2][2] = "🐢";
        SCAPE[2][3] = "🌊";

        SCAPE[3][0] = "🌊";
        SCAPE[3][1] = "🌊";
        SCAPE[3][2] = "🌊";
        SCAPE[3][3] = "🌊";

        break;
      case TEMPLATE == 'space':
        SCAPE[0][0] = "*";
        SCAPE[0][1] = "˚";
        SCAPE[0][2] = "⭐️";
        SCAPE[0][3] = "  ";

        SCAPE[1][0] = "*";
        SCAPE[1][1] = "  ";
        SCAPE[1][2] = "🚀";
        SCAPE[1][3] = "✺";

        SCAPE[2][0] = "*";
        SCAPE[2][1] = "  ";
        SCAPE[2][2] = "·";
        SCAPE[2][3] = "✷";

        SCAPE[3][0] = "✵";
        SCAPE[3][1] = "✺";
        SCAPE[3][2] = "  ";
        SCAPE[3][3] = "✺";

        break;
      case TEMPLATE == 'garden':
        SCAPE[0][0] = "🌱";
        SCAPE[0][1] = "🌱";
        SCAPE[0][2] = "🌱";
        SCAPE[0][3] = "🌱";

        SCAPE[1][0] = "🌱";
        SCAPE[1][1] = "🌹";
        SCAPE[1][2] = "🌱";
        SCAPE[1][3] = "🌱";

        SCAPE[2][0] = "🌱";
        SCAPE[2][1] = "🌱";
        SCAPE[2][2] = "🍄";
        SCAPE[2][3] = "🌱";

        SCAPE[3][0] = "🌻";
        SCAPE[3][1] = "🌱";
        SCAPE[3][2] = "🌱";
        SCAPE[3][3] = "🌱";

        break;
      case TEMPLATE == 'city':
        SCAPE[0][0] = "🌕";
        SCAPE[0][1] = "  ";
        SCAPE[0][2] = "⭐️";
        SCAPE[0][3] = "✨";

        SCAPE[1][0] = "  ";
        SCAPE[1][1] = "⭐️";
        SCAPE[1][2] = "  ";
        SCAPE[1][3] = "🌟";

        SCAPE[2][0] = "⭐️";
        SCAPE[2][1] = "  ";
        SCAPE[2][2] = "  ";
        SCAPE[2][3] = "  ";

        SCAPE[3][0] = "🏛";
        SCAPE[3][1] = "🏢";
        SCAPE[3][2] = "🏪";
        SCAPE[3][3] = "🏢";

        break;
      default:
        SCAPE[i][j] = "";
    }

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
        gridContent += '<div class="grid__column"><div class="grid__content">'+ SCAPE[currRow][currCol]+'</div></div>';
      }
      gridContent += '</div>';
    }

    return gridContent;
  }

  function buildPage() {
    PAGE.removeClass('page--prep');
    GRID.html(buildScape());
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

    return SCAPE;
  }

  // ------------------------------------------------------
  // BUILD row/column data
  // ------------------------------------------------------
  // function buildRows() {
  //   var setRows = $('#scape-create__rows').find('input'),
  //       setRowsVal = setRows.attr('placeholder');

  //   if (setRows.val() != ''){
  //       setRowsVal = setRows.val();
  //   }

  //   setRowsVal = parseInt(setRowsVal);

  //   console.log('There are now ' + setRowsVal + ' rows');

  //   return setRowsVal;
  // }

  function buildRows () {
    return 4;
  }

  function buildCols() {
    return 4;
  }

  // function buildCols() {
  //   var setCols = $('#scape-create__columns').find('input'),
  //       setColsVal = setCols.attr('placeholder');

  //   if (setCols.val() != ''){
  //       setColsVal = setCols.val();
  //   }

  //   setColsVal = parseInt(setColsVal);

  //   console.log('There are now ' + setColsVal + ' columns');
    
  //   return setColsVal;
  // }

  // ------------------------------------------------------
  // GET row/column data
  // ------------------------------------------------------

  // var NUMROWS = numRows(),
  //     NUMCOLS = numCols();


  // ------------------------------------------------------
  // STORE column data
  // ------------------------------------------------------

  // ------------------------------------------------------
  // MOD Grid
  // ------------------------------------------------------
  function getDirection(e) {
    var direction = $(e).parent().attr('class').replace('grid-controls__','');

    return direction;
  }

  function addRow(dir) {
    var newRow = new Array();

    for(var i = 0; i < NUMCOLS; i++) {
      newRow[i] = '';
    }

    if(dir == 'top') {
      SCAPE.unshift(newRow);
    } else {
      SCAPE.push(newRow);
    }

    GRID.html(buildScape());
    sizeThings();
  }

  function rmRow(dir) {
    if(dir == 'top') {
      SCAPE.splice(0, 1);
    } else {
      SCAPE.splice(-1, 1);
    }

    GRID.html(buildScape());
    sizeThings();
  }

  function addCol(dir) {

    if(dir == 'left') {
      for(var i = 0; i < NUMROWS; i++) {
        SCAPE[i].unshift('');
      }

    } else { // right
      for(var i = 0; i < NUMROWS; i++) {
        SCAPE[i].push('');
      }
    }

    GRID.html(buildScape());
    sizeThings();
  }

  function rmCol(dir) {
    if(dir == 'left') {
      for(var i = 0; i < NUMROWS; i++) {
        SCAPE[i].splice(0, 1);
      }
    } else { // right
      for(var i = 0; i < NUMROWS; i++) {
        SCAPE[i].splice(-1, 1);
      }
    }

    GRID.html(buildScape());
    sizeThings();
  }

  function growGrid(e){
    var direction = getDirection(e);

    // grow rows
    if((direction == 'top') || (direction == 'bottom')) {
      NUMROWS += 1;
      addRow(direction);
      NUMROWS = numRows();

    // grow columns
    } else {
      NUMCOLS += + 1;
      addCol(direction);
      NUMCOLS = numCols();
    }
  }

  function shrinkGrid(e) {
    var direction = getDirection(e);

    if((direction == 'top') || (direction == 'bottom')) {
      NUMROWS = parseInt(NUMROWS) - 1;
      rmRow(direction);
      NUMROWS = numRows();
    
    } else { // shrink columns
      NUMCOLS = parseInt(NUMCOLS) - 1;
      rmCol(direction);
      NUMCOLS = numCols();
    }
  }

  $('.grid-controls__grow').on('click', function() {
    growGrid(this);
  });

  $('.grid-controls__shrink').on('click', function() {
    shrinkGrid(this);
  });

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
    
    $('.scape-create__btn').click(function(e){
      NUMROWS  = buildRows();
      NUMCOLS  = buildCols();

      e.preventDefault();

      chooseTemplate(this);
      console.log(TEMPLATE)
      sizeScape();
      buildPage();
      sizeThings();
    });

    GRID.on("click", ".grid__column", function() {
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

  $(window).resize(function () {
    sizeThings();
  })

} // END OF EMOJISCAPE OBJECT

window.emoji_scape = new Emojiscape();
