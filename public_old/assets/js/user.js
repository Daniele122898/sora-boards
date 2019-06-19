$(document).ready(function () {
    getUser();
});

function getUser() {
    $.get("http://localhost:8089/api/getUserData", function (data) {
        var user = JSON.parse(data);
        //Update data on page
        $(".username").text(user.username);
        $(".discriminator").text("#"+user.discriminator);
        $(".userImg").attr("src", user.avatar);
    });
}