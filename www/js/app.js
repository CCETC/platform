(function() {
  document.addEventListener("touchstart", function(){}, true);
  if (location.search === '?native') {
    var ma = document.createElement('script');
    ma.type = 'text/javascript';
    ma.async = true;
    ma.src = '/js/cordova.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ma,s);
    document.body.className = "cordova";
  }
})();
