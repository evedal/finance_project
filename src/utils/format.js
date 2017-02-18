/**
 * Created by evend on 2/18/2017.
 */
function getTimeSincePosted (datePosted){
    "use strict";
    let t = datePosted.replace("T"," ");
    t = t.replace("Z","");
    t = t.split(/[- :]/);
    let postedDate = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    let timeDiffMillis = Date.now() - postedDate.getTime();
    let timeDiffMin = Math.round(timeDiffMillis/(1000*60));
    let timeDiffHour = Math.floor(timeDiffMin/60);
    let timeFormatted;
    if(timeDiffHour > 0){
        if(timeDiffHour == 1){
            timeFormatted = timeDiffHour + " time"
        }
        else{
            timeFormatted = timeDiffHour + " timer"
        }
    }
    else{
        if(timeDiffMin == 1){
            timeFormatted = timeDiffMin + " minutt"
        }
        else{
            timeFormatted = timeDiffMin + " minutter"
        }
    }
    return(timeFormatted)

}
export {
    getTimeSincePosted as timeSincePosted
}