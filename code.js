
window.jQuery || (function () {
  window.setTimeout(function () {
    var d = document;
    var f = d.getElementsByTagName('script')[0];
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    f.parentNode.insertBefore(s, f);
  }, 1);
})();


var patchStatsTable = function ($table, $) {
  var $header = $table.find('.paginated_table_header');
  var $footer = $table.find('.paginated_table_footer');
  var $rows = $table.find('.paginated_table_row, .paginated_table_footer');

  var $clicksHeader = $header.find('.column_clicks_count_view');
  var $joinsHeader = $header.find('.column_joins_count_view');
  var isSummaryTable = !$joinsHeader.length;

  if (isSummaryTable) {


    $header.find('.last_column').removeClass('last_column');
    if (!$header.find('.column_price_per_click').length) {
      $header.append('' +
        '<th class=\"patched paginated_table_cell column_price_per_click last_column\" style=\"text-align:center;padding: 5px 3px;visibility: visible;\">' +
          '<span class=\"table_header_upper_span\" style=\"vertical-align:center;\">Цена клика</span>' +
        '</th>'
      );
    }

    if (!$header.find('.last_column').length) {
      $header.find('.paginated_table_cell').addClass('last_column');
    }

    $rows.each(function(i, row){
      var $row = $(row);
      $row.find('.last_column').removeClass('last_column');

      var price = parseFloat($.trim($row.find('.column_money_amount_view').text()));
      var clicks = parseFloat($.trim($row.find('.column_clicks_count_view').text()));

      var pricePerClick = 0;
      if (clicks) {
        pricePerClick = price / clicks;
      }
      if (!$row.find('.column_price_per_click').length) {
        $row.append('<td class=\"patched column_price_per_click paginated_table_cell last_column\" style=\"white-space: nowrap;\"></td>');
      }
      $row.find('.column_price_per_click').html(pricePerClick.toFixed(2) +'&nbsp;руб.');
    });


  } else {


    $header.find('.last_column').removeClass('last_column');
    if (!$header.find('.column_price_per_click').length) {
      $header.append('' +
        '<th class=\"patched paginated_table_cell column_price_per_click last_column\" style=\"text-align:center;padding: 5px 3px;visibility: visible;\">' +
          '<span class=\"table_header_upper_span\" style=\"vertical-align:center;\">Цена клика</span>' +
        '</th>'
      );
    }
    if (!$header.find('.column_price_per_join').length) {
      $header.append('' +
        '<th class=\"patched paginated_table_cell column_price_per_join\" style=\"text-align:center;padding: 5px 3px;visibility: visible;\">' +
          '<span class=\"table_header_upper_span\" style=\"vertical-align:center;\">Цена вступления</span>' +
        '</th>'
      );
    }
    if (!$header.find('.column_conversion').length) {
      $header.append('' +
        '<th class=\"patched paginated_table_cell column_conversion last_column\" style=\"text-align:center;padding: 5px 3px;visibility: visible;\">' +
          '<span class=\"table_header_upper_span\" style=\"vertical-align:center;\">Конверт</span>' +
        '</th>'
      );
    }
    if (!$header.find('.last_column').length) {
      $header.find('.paginated_table_cell').addClass('last_column');
    }

    $rows.each(function(i, row){
      var $row = $(row);
      $row.find('.last_column').removeClass('last_column');

      var price = parseFloat($.trim($row.find('.column_money_amount_view').text()));
      var clicks = parseFloat($.trim($row.find('.column_clicks_count_view').text()));
      var joins = parseFloat($.trim($row.find('.column_joins_count_view').text()));

      var pricePerClick = 0;
      if (clicks) {
        pricePerClick = price / clicks;
      }
      if (!$row.find('.column_price_per_click').length) {
        $row.append('<td class=\"patched column_price_per_click paginated_table_cell last_column\" style=\"white-space: nowrap;\"></td>');
      }
      $row.find('.column_price_per_click').html(pricePerClick.toFixed(2) +'&nbsp;руб.');

      var pricePerJoin = 0;
      if (joins) {
        pricePerJoin = price / joins;
      }
      if (!$row.find('.column_price_per_join').length) {
        $row.append('<td class=\"patched column_price_per_join paginated_table_cell\" style=\"white-space: nowrap;\"></td>');
      }
      $row.find('.column_price_per_join').html(pricePerJoin.toFixed(2) +'&nbsp;руб.');

      var convert = 0;
      if (clicks) {
        convert = (joins / clicks) * 100;
      }
      if (!$row.find('.column_conversion').length) {
        $row.append('<td class=\"patched column_conversion paginated_table_cell last_column\" style=\"white-space: nowrap;\"></td>');
      }
      $row.find('.column_conversion').html(convert.toFixed(2) +'&nbsp;%');
    });


  }
};

var ranges = [5, 10];
var getTypeOfPostsPerDay = function (val) {
  val = (typeof val != 'undefined') ? val : 9999999;
  if (val > 0 && val <= ranges[0]) {
    return 'success';
  } else if (val > ranges[0] && val <= ranges[1]) {
    return 'warning';
  }
  return 'danger';
};
var getColor = function (val) {
  var colors = {
    danger: '#CB0102',
    warning: '#F48900',
    success: '#2D7D2B'
  };
  return colors[getTypeOfPostsPerDay(val)];
};
var getWeight = function (val) {
  return (getTypeOfPostsPerDay(val) == 'success') ? 'bold' : 'normal';
};
var patchGroupsTable = function ($items, $) {
  $items.each(function () {
    var $this = $(this);
    var text = $this.text().split(' ').join('');
    var digits = text.split('/');
    var perPost = parseFloat(digits[0]);
    var perDay = parseFloat(digits[1]);
    var postsPerDay = Math.round(parseFloat(perDay / perPost) * 10) / 10;
    var $patch = $('<div/>');
    $patch.css({
      padding: '3px 10px',
      margin: '2px 0 0',
      background: getColor(postsPerDay),
      color: '#fff',
      textAlign: 'center',
      fontWeight: getWeight(postsPerDay)
    }).html(postsPerDay);
    $this.closest('td').addClass('patched').append($patch);
  });
};


window.runPatcher = window.runPatcher || function ($) {
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = ''+
  '.ads_unions_table .paginated_table_header th.paginated_table_cell div {'+
  '  padding-left: 5px;'+
  '  padding-right: 5px;'+
  '  text-align: center;'+
  '}';
  var tmp = document.getElementsByTagName('script')[0];
  tmp.parentNode.insertBefore(css, tmp);

  var groupsTableOldHTML = '';
  var watcherInterval = window.setInterval(function () {
    var $statsTable = $('.ads_unions_table');
    if ($statsTable.length) {
      var $emptyRow = $statsTable.find('.empty_row');
      var $lastSimpleTableCell = $('.paginated_table_row:first').find('.paginated_table_cell.last_column').filter(':first');
      if (!$emptyRow.length && !$lastSimpleTableCell.hasClass('patched')) {
        patchStatsTable($statsTable, $);
      }
    }

    var $groupsTable = $('#exchange_comm_search_table');
    if ($groupsTable.length) {
      var groupsTableHTML = $groupsTable.html();
      if (groupsTableHTML != groupsTableOldHTML) {
        groupsTableOldHTML = groupsTableHTML;
        patchGroupsTable($groupsTable.find('tr[class] td:nth-child(4):not(.patched) b'), $);
      }
    }

  }, 300);
};

var tryCount = 50;
var currentIter = 0;
var timeout = 200;
var check = function () {
  return typeof window.jQuery != 'undefined' && typeof window.runPatcher == 'function';
};
var jqInjectInterval = window.setInterval(function () {
  currentIter++;
  if (check()) {
    //console.log(currentIter, 'jQuery loaded.');
    window.runPatcher(window.jQuery);
    window.clearInterval(jqInjectInterval);
  } else if (currentIter == tryCount) {
    //console.log(currentIter, 'Failed load jQuery. Abort.');
    window.clearInterval(jqInjectInterval);
    alert('Не удалось загрузить jQuery :-(');
  }
}, 200);
