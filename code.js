var ranges = [5, 10];
var tableSelector = '#exchange_comm_search_table';
var patchedClass = 'patched';
var cellSelector = 'tr[class] td:nth-child(4):not(.'+ patchedClass +') b';

window.jQuery || (function () {
  window.setTimeout(function () {
    var d = document;
    f = d.getElementsByTagName('script')[0];
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    f.parentNode.insertBefore(s, f);
  }, 1);
})();


var getTypeOfPostsPerDay = function (val) {
  val = (typeof val != 'undefined') ? val : 9999999;

  if (val > 0 && val <= ranges[0]) {
    return 'success';
  } else if (val > ranges[0] && val <= ranges[1]) {
    return 'warning';
  }

  return 'danger';
}

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

var patch = function ($items, $) {
  console.log('patch!', $items);
  $items.each(function () {
    var $this = $(this);
    var text = $this.text().split(' ').join('');
    var digits = text.split('/');
    var perPost = parseFloat(digits[0]);
    var perDay  = parseFloat(digits[1]);
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






var tryCount = 50;
var currentIter = 0;
var timeout = 200;

var check = function () {
  return typeof window.jQuery != 'undefined';
};

var run = function ($) {
  console.log('run!', $);
  var oldTableInnerHTML = '';

  var watcherInterval = window.setInterval(function () {
    var $table = $(tableSelector);
    var tableHTML = $table.html();
    if (tableHTML == oldTableInnerHTML) {
      console.log('Nothing changes.');
      return;
    }
    oldTableInnerHTML = tableHTML;
    console.log('Table changed!');

    patch($table.find(cellSelector), $);
  }, 300);
};

interval = window.setInterval(function () {
  currentIter++;
  if (check()) {
    console.log(currentIter, 'jQuery loaded.');
    window.clearInterval(interval);
    run(window.jQuery);
  } else if (currentIter == tryCount) {
    console.log(currentIter, 'Failed load jQuery. Abort.');
    window.clearInterval(interval);
    alert('Не удалось загрузить jQuery :-(');
  }
}, 200);
