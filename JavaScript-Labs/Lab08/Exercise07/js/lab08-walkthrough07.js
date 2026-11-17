var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");
// document.write(daysOfWeek + "<br/>");

document.write("<table border=1>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].length < 4)
        day = daysOfWeek[i];
    else
        day = "<em>" + daysOfWeek[i] + "</em>";
    document.write("<th>" + day + "</th>");
}
document.write("</tr>");
for (var number = 1; number <= 30; number++) {
    if ((number - 1) % 7 === 0) document.write("<tr>");
    document.write("<td>" + number + "</td>");
    if (number % 7 === 0) document.write("</tr>");
}
if (30 % 7 !== 0) {
    for (var blank = 0; blank < 7 - (30 % 7); blank++) document.write("<td></td>");
    document.write("</tr>");
}
document.write("</table>");
