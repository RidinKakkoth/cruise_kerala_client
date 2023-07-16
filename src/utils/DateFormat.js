export default function dateConvert(date){

    const checkInDate = new Date(date);
    return   checkInDate.toDateString();
    
}