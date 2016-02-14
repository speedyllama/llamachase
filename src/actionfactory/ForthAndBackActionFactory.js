(function(){
    ForthAndBackActionFactory = {
        newAction: function(minY, maxY, minTime, maxTime){
            return function(llama) {
                function move() {
                    minY = minY == undefined ? 800 : minY;
                    maxY = maxY == undefined ? 1600 : maxY;
                    var forthY = Math.random() * (maxY - minY) + minY;
                    var backY = Math.random() * (maxY - minY) + minY;
                    minTime = minTime == undefined ? 0.5: minTime;
                    maxTime = maxTime == undefined ? 2: maxTime;
                    var forthTime = Math.random() * (maxTime - minTime) + minTime;
                    var backTime = Math.random() * (maxTime - minTime) + minTime;
                    llama.runAction(
                        cc.sequence(
                            cc.moveTo(forthTime, new cc.Point(880, forthY)),
                            cc.scaleBy(0.5, -1, 1),
                            cc.moveTo(backTime, new cc.Point(200, backY)),
                            cc.scaleBy(0.5, -1, 1),
                            cc.callFunc(move, this)
                        )
                    );
                }
                move();
            }
        }
    };
})();