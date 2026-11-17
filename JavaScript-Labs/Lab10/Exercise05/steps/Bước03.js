$(function () {
    // create a new DOM element
    var img = $('<img src="../images/art/thumbs/13030.jpg" >');
    // add element to/near existing panel (Lab10 PDF step 3)
    var panel = $('.panel');
    panel.before(img);
});
