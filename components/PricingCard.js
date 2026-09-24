"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Razorpay from 'razorpay';
import Script from 'next/script'




const PricingCard = () => {
  const {data:session , update} = useSession();
  const router = useRouter();

  

  const handlePayment = async()=>{
    try {
      const res = await fetch("/api/payment/create-order",{method:"POST"});
      const data = await res.json();

      if(!res.ok){
        console.log(data.error); 
        return;
      }

      var options = {
    "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
    "amount": "29900", // Amount is in currency subunits.
    "currency": "INR",
    "name": "ReadmeAI", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler":  async function (response){
        const verifyres = await fetch("/api/payment/verify",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
          RazorpayOrderId: response.razorpay_order_id,
         RazorpayPaymentId: response.razorpay_payment_id,
         razorpaySignature: response.razorpay_signature,

         })
        })

        const verifydata = await verifyres.json();

        if(verifydata.success){
          update();
          alert("Payment successful! You are now on Pro plan.");
          router.refresh();

        }else{
          alert("payment failed");
        }


    },

    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com", 
        "contact": "+919876543210"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
  const razorpay = new window.Razorpay(options);
  razorpay.open();

    } catch (error) {
       console.log(error)
      alert("Something went wrong");
      
    }
  }


  return (
    <>
       <Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="afterInteractive"
/>

    <section className="bg-[#111111] py-5 px-6 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Simple Pricing</h2>
        <p className="text-gray-400 mt-2">
          Start free, upgrade when you need more
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-semibold">Free</h3>

            <div className="mt-3">
              <span className="text-5xl font-bold">₹0</span>
              <span className="text-gray-400"> / month</span>
            </div>

            <p className="text-gray-400 mt-2">
              Perfect for trying it out
            </p>

            <div className="mt-6 space-y-3 text-left">
              <p>✓ 3 generations / month</p>
              <p>✓ Markdown preview</p>
              <p>✓ Copy & download</p>
            </div>

            <button className="w-full mt-8 border border-gray-600 rounded-lg py-3 hover:bg-white hover:text-black transition">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-[#1a1a1a] border-2 border-blue-500 rounded-2xl p-8">
            <span className="absolute top-4 left-5 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              Most Popular
            </span>

            <h3 className="text-xl font-semibold mt-6">Pro</h3>

            <div className="mt-3">
              <span className="text-5xl font-bold">₹299</span>
              <span className="text-gray-400"> / month</span>
            </div>

            <p className="text-gray-400 mt-2">
              For active developers
            </p>

            <div className="mt-6 space-y-3 text-left">
              <p>✓ Unlimited generations</p>
              <p>✓ Save history</p>
              <p>✓ Priority AI speed</p>
              <p>✓ UPI / Cards Payment</p>
            </div>

            <button onClick={()=>handlePayment()} className="w-full mt-8 bg-white text-black rounded-lg py-3 hover:bg-gray-200 transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default PricingCard;