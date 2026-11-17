// this variable has global scope
var boxClass = 'movingDiv';

function outputBox(num) {
    box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}
// Bước 9: tham khảo để tạm thay thế hàm và quan sát ReferenceError với console.log(box)
var boxClass = 'movingDiv';
function outputBox(num) {
    var box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}