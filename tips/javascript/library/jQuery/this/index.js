
// bad ex
////////////////////////////////
$('.ex').on('click', function(){
  $(this).addClass('clicked');
  setTimeout( function(){
    $(this).removeClass('clicked');
  }, 2000 );
});


// good ex
////////////////////////////////
$('.ex').on('click', function(){
  var target = $(this);
  target.addClass('clicked');
  setTimeout( function(){
    target.removeClass('clicked');
  }, 2000 );
});
