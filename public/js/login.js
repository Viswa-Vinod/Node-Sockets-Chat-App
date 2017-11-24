var socket = io();
socket.emit("login", function(arguments) {
    var select = jQuery("select");
    if (arguments) {
        var opt = jQuery("<option></option>");
        opt.attr("selected", "selected").text("Select a Room");
        select.append(opt);
        arguments.forEach(room => {
            var opt = jQuery("<option></option>");
            opt.attr("value", room).text(room);
            select.append(opt);
        });
    } else {
        var opt = jQuery("<option></option>");
        opt.attr("selected", "selected").text("No Active Rooms");
        select.append(opt);
    }
});

function handleChange() {
    console.log(jQuery("select").val());
    jQuery('[name="room"]').val(jQuery("select").val());
}
