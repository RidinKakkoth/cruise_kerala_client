export default function validation(data){

    const {name,category,description,boarding,town,district,pin,rooms,baseRate,extraRate,maxGuest}=data

    if(!(name&&category&&description&&boarding&&town&&district&&pin&&rooms&&baseRate&&extraRate&&maxGuest)){
      return "All fields must be filled"
    }

    if (name.trim() === '') {
      
        return 'Name is required';
      }
    if (description.trim() === '') {
      
        return 'description is required';
      }
    if (boarding.trim() === '') {
      
        return 'boarding is required';
      }
    if (town.trim() === '') {
      
        return 'town is required';
      }
    if (district.trim() === '') {
      
        return 'district is required';
      }
    if (district.trim() === '') {
      
        return 'district is required';
      }
    if (category.trim() === '') {
      
        return 'choose category';
      }
      
return ""

}