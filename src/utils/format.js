/**
 * Created by evend on 2/18/2017.
 */
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function getTimeSincePosted (datePosted){
    "use strict";
    let t = datePosted.replace("T"," ");
    t = t.replace("Z","");
    t = t.split(/[- :]/);
    let postedDate = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    let timeDiffMillis = Date.now() - postedDate.getTime();
    let timeDiffMin = Math.round(timeDiffMillis/(1000*60));
    let timeDiffHour = Math.floor(timeDiffMin/60);
    console.log(timeDiffMin);
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
function formatUrl(url) {
    //Remove spaces
    let fUrl = url.replaceAll(' ', "-");
    //Remove capital letters
    fUrl = fUrl.toLowerCase();
    //Set non-UTF letters to replacements
    fUrl = fUrl.replaceAll('å','aa').replaceAll('ø','o').replaceAll('æ','ae');
    console.log(fUrl)
    //Fix edge cases
    return encodeURI(fUrl);

}
export default {
    timeSincePosted: getTimeSincePosted,
    formatUrl: formatUrl
}