
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

export{
convertStringToDate
}

