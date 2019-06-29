$(document).ready(function () {
    getLeaderboard();
});

function getLeaderboard() {
    //Get Leaderboard info
    var page = $("#afterLoading").find(".container");
    page.hide();
    $.get("http://sorabot.pw/api/globalleaderrequest", function (data) {
        if(data == null){
            var error = '<div class="alert alert-danger alert-botpermissions">This Site doesn\'t exist!</div>';
            $(".list-group").html(error);
            return;
        }
        var dat = JSON.parse(data);

        for(var i=0; i<dat.ranks.length; i++){
            var user = dat.ranks[i];
            var html = $(".list-group").html();
            var percent = (100/user.nextExp)*user.exp;
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
                '                                <h3>Level '+Math.floor(0.15*Math.sqrt(user.exp))+'</h3>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
            $(".list-group").html(html);
        }
        var html = "";
        for(var i=0; i<dat.shardCount; i++){
            var found = false;
            for(var y=0; y<dat.shards.length; y++){
                if(dat.shards[y] === i){
                    found = true;
                }
            }
            if(found){
                html += '<strong>Shard '+i+'</strong> <span class="bg-green label-botpermissions">online</span> ' +
                    '<br>';
            } else{
                html += '<strong>Shard '+i+'</strong> <span class="bg-red label-botpermissions">offline</span> ' +
                    '<br>';
            }
        }

        $("#shardStatus").html(html);
        page.show();
        $(".spinner").remove()
    });
}
//(int)Math.Floor(0.15F * Math.Sqrt(exp));