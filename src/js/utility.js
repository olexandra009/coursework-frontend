function convertStringToDate(str){
    //str = "dd.mm.yyyy, hh:mm:ss
    let array = str.split(', ');
    let date = array[0];
    let time = array[1];
    let dateArray = date.split('.');
    let timeArray = time.split(':');
    let dateTimeArray = [];
    dateArray.forEach(x => dateTimeArray.push(parseInt(x)));
    timeArray.forEach(x => dateTimeArray.push(parseInt(x)));
    return new Date(dateTimeArray[2], dateTimeArray[1]-1, dateTimeArray[0], dateTimeArray[3], dateTimeArray[4], dateTimeArray[5]);
}

function editHtmText(text){
    let addLines = newLinedText(text);
    return remove_tags(addLines);
}

function remove_tags(html){
    let br = html.replaceAll("<br>","||br||").replaceAll("<br/>","||br||").replaceAll("<br />","||br||");
    let i = br.replaceAll("<i>","||is||").replaceAll("</i>","||ie||");
    let b = i.replaceAll("<b>","||bs||").replaceAll("</b>","||be||");

    let tmp = document.createElement("DIV");
    tmp.innerHTML = b;
    let result = tmp.textContent||tmp.innerText;
    result = result.replaceAll("||br||","<br />")
        .replaceAll("||is||","<i>").replaceAll("||ie||","</i>")
        .replaceAll("||bs||","<b>").replaceAll("||be||","</b>");
    return result;
}
function newLinedText(t){ return t.replaceAll('\n','<br />')}

function getStatusApplicationLine(st){
    let s = parseInt(st);
    switch (s) {
        case 1: return 'Очікується';
        case 2: return "В процесі";
        case 3: return "Закрите";
    }
}
function getIconApplicationStatus(st){
    let s = parseInt(st);
    switch (s) {
        case 1: return 'clock';
        case 2: return "hourglass-split";
        case 3: return "check2-circle";
    }
}

function endPetitionDate(finish) {
    let date = convertStringToDate(finish);
    let dateNow = new Date();
    return dateNow<date;
}
function statusPetitionLine(currentVotes, minVotes, finishDate, result) {
    let data =convertStringToDate(finishDate);
    let now = new Date();
    if(minVotes<=currentVotes){
        if(result&&result.length>0)
            return `З відповіддю`;
        return `На розгляді`;
    } else {
        if(now>data)
            return `Не підтримано`;
        else
            return `Триває збір підписів`;
    }
}
function statusPetitionIcon(currentVotes, minVotes, finishDate, result) {
    let data = convertStringToDate(finishDate);
    let now = new Date();
    if (minVotes <= currentVotes){
        if(result&&result.length>0)
            return 'check-circle';
        return "hourglass-split";
    } else {
        if(now>data){
            return 'x';
        } else {
            return "hourglass-split";
        }
    }
}

function votesPetitionString(numVote) {
    let num = parseInt(numVote);
    if (num === 11 || num === 12 || num === 13 || num === 14)
        return 'голосів';
    let numStr = numVote.toString();
    let numLast = parseInt(numStr.substring(numStr.length - 1));
    switch (numLast) {
        case 0: case 5: case 6:
        case 7: case 8: case 9:
            return 'голосів';
        case 1:
            return "голос";
        case 2: case 3: case 4:
            return "голоси";
    }
}

function lastPetitionDate(finishDate) {
    let date = convertStringToDate(finishDate);
    let dateNow = new Date();
    let diff = Math.abs(date-dateNow);
    let days = parseInt(diff/1000/60/60/24);
    if( days === 0) return "Залишилось менше доби";
    let dS;
    let str = days.toString();
    let last = parseInt(str.substring(str.length-1));
    if (days===11||days===12||days===13||days===14)
        dS= 'днів';
    else
        switch(last){
            case 0: case 5: case 6:
            case 7: case 8: case 9:
                dS= 'днів';
                break;
            case 1:
                dS= "день";
                break;
            case 2: case 3: case 4:
                dS= "дні";
                break;
        }
    return "Залишилось "+days +" "+dS;
}

/***Rights checks**/
function isAdminUserManagerRight(roles) {
    if(roles===undefined||roles===null) return false;
    if(roles.length === 0) return false;
    if(roles.includes('UserManager'))
        return true;

}

export{
    convertStringToDate,
    editHtmText,
    newLinedText,
    remove_tags,
    getIconApplicationStatus,
    getStatusApplicationLine,
    lastPetitionDate,
    endPetitionDate,
    votesPetitionString,
    statusPetitionIcon,
    statusPetitionLine,
}

