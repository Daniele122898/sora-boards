$(document).ready(function () {
    getLeaderboard();
});

function calculateLevel(exp){
    return Math.floor(0.15*Math.sqrt(exp));
}

function calculateNeededExp(lvl){
    return Math.pow(lvl/0.15,2);
}

function getLeaderboard() {
    var guildId = getIDfromPath(window.location.pathname);
    var page = $(".list-group");
    page.hide();
    //Get Leaderboard info
    $.get("http://sorabot.pw/api/leaderrequest/"+guildId, function (data) {
        if(data == null){
            var error = '<div class="alert alert-danger alert-botpermissions">This Site doesn\'t exist!</div>';
            page.html(error);
            page.show();
            $(".spinner").remove();
            return;
        }
        var dat = JSON.parse(data);
        var succ = dat.success;
        if(!succ) {
            var error = '<div class="alert alert-danger alert-botpermissions">This Site doesn\'t exist!</div>';
            page.html(error);
            page.show();
            $(".spinner").remove();
            return;
        }

        $("#guildImg").attr("src", dat.avatarUrl);
        $("#guildName").text(dat.guildName);

        for(var i=0; i<dat.ranks.length; i++){
            var user = dat.ranks[i];
            var html = page.html();
            var level = calculateLevel(user.exp);
            var thisExp = calculateNeededExp(level);
            var ep = user.exp - thisExp;
            var needed = user.nextExp - thisExp;
            var percent = (100/needed)*ep;
            html += '<div class="list-group-item">\n' +
                '                        <div class="row">\n' +
                '                            <div class="col-md-1 col-sm-1 col-xs-1">\n' +
                '                                <h3><strong>#'+user.rank+'</strong></h3>\n' +
                '                            </div>\n' +
                '                            <div class="col-md-1 col-sm-1 hidden-xs" style="padding:0">\n' +
                '                                <img src="'+user.avatarUrl+'" onerror="this.src=\'/static/img/no_logo.png\'" style="width:100%" class="img-circle">\n' +
                '                            </div>\n' +
                '                            <div class="col-md-4 col-sm-4 col-xs-5">\n' +
                '                                <h3><span class="username">'+user.name+'</span> <small>#'+user.discrim+'</small></h3>\n' +
                '                            </div>\n' +
                '                            <div class="col-md-4 col-sm-4 col-xs-4">\n' +
                '                                <center><h5>'+user.exp+' / '+user.nextExp+' <strong>EXP</strong></h5></center>\n' +
                '                                <div class="progress">\n' +
                '                                    <div class="progress-bar progress-bar-striped progress-bar-sora" role="progressbar" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100" style="width: '+percent+'%;"></div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="col-md-2 col-sm-2 col-xs-2">\n' +
                '                                <h3>Level '+level+'</h3>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            page.html(html);
        }

        page.show();
        $(".spinner").remove();

        //check if there are no role rewards
        if(dat.roleRewards== null || dat.roleRewards.length === 0){
            $("#roleReward").html("No roles rewarded")
        }else {
            //role rewards
            for (var i = 0; i < dat.roleRewards.length; i++) {
                var rew = dat.roleRewards[i];
                var html = $("#roleReward").html();
                html += '<h5>Lvl. ' + rew.levelReq + '</h5>\n' +
                    '                        <strong style="color: ' + rew.color + ';">' + rew.name + '</strong> ' +
                    '<br>';
                $("#roleReward").html(html);
            }
        }

    });
}
//(int)Math.Floor(0.15F * Math.Sqrt(exp));
function getIDfromPath(path){
    var id ="";
    path = path.substring(7, path.length);
    id = path.substring(0, path.indexOf("/"));
    return id;
}