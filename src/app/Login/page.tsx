// "use client";

// import Button from '@/components/Button';
// import Input from '@/components/Input';
// import Section from '@/components/Layout';
// import axios from 'axios';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import HelperImage from "@/app/assets/Login.com.svg";
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';

// function Login() {

//   return (
//     <Section heading="Login" classnames="flex-col justify-start h-[50vh]">
//       <form onSubmit={handleSubmit}> {/* Add onSubmit to the form */}
//         <Input
//           classnames="py-6"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeHolder='Enter Email'
//         />
//         <Input
//           classnames="py-6"
//           value={password}
//           placeHolder='Enter Password'
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="flex justify-start">
//           <Button
//             text="Log In"
//             classnames="bg-green-500 hover:bg-green-600"
//             type="submit" // Change type to "submit"
//           />
//         </div>

//         <div className="absolute right-[20%] -mt-[3%]">
//           <Image
//             src={HelperImage}
//             alt="Check In & Check Out"
//             width={400}
//             height={300}
//             className="-mt-8"
//           />
//         </div>
//       </form>
//       <div className='text-sm font-semibold text-[#FB5151] py-6 underline font-serif'>
//         Forgot Password
//       </div>
//     </Section>
//   );
// }

// export default Login;
