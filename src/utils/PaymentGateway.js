export default async function displayRazorpay(){


    const data = await fetch('http://localhost:5000/razorpay', {method: 'POST'}).then((t) => 
    t.json()
  ) 
console.log(data);

    const options={
        key:"rzp_test_drvVy05m61MDRI",
        currency:data.currency,
        amount:data.amount,
        description:'Wallet Transaction',
        image:"https://www.pngall.com/wp-content/uploads/8/Rudder-PNG-Picture.png",
        order_id:data.id,
        handler:function(response){
            alert("PAYMENT ID: "+response.razorpay_payment_id)
            alert("ORDER ID: "+response.razorpay_order_id)
        },
        prefill:{
            name:'ridin',
            email:"ridin.ksr@gmail.com",
            contact:'9895774042'
        }
    };

    const paymentObject=new window.Razorpay(options)
    paymentObject.open()
}