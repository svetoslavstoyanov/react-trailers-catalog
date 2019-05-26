function dateCompare(movieReleaseDate) {
    let text = '';
    let arr = movieReleaseDate.split('-');
    let newDate = new Date();
    let currentDate = newDate.getDate();
    let currentMonth = newDate.getMonth() + 1;
    let currentYear = newDate.getFullYear();
    let isInTheaters = false;
    let isToday = false;

    if (currentYear >= Number(arr[0]) && currentMonth >= Number(arr[1]) && currentDate > Number(arr[2])) {
        isInTheaters = true
    }

    if (
        Number(arr[0]) === currentYear &&
        Number(arr[1]) === currentMonth &&
        Number(arr[2]) === currentDate
    ) {
        isToday = true;
    }

    if (isInTheaters) {
        text = ` Available since ${movieReleaseDate}`;
    } else if (isToday) {
        text = ' Available since today';
    } else {
        text = ` ${movieReleaseDate}`;
    }
    return text;
}
export default dateCompare
