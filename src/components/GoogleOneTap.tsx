// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import api from '../../utils/axios';

// interface GoogleOneTapLoginResponse {
//     success: boolean;
//     message: string;
//     user?: {
//       id: string;
//       name: string;
//       email: string;
//     };
// }

// const googleOneTapLogin = (data:  { token: string }): Promise<GoogleOneTapLoginResponse>  => {
//     const path = `/auth/google/oneTapLogin`;
//     return api.post(path, data);
// };

// const GoogleOneTapLogin = () => {
//     const router = useRouter();

//     useEffect(() => {
//         // will show popup after two secs
//         const timeout = setTimeout(() => oneTap(), 2000);
//         return () => {
//             clearTimeout(timeout);
//         };
//     }, []);

//     const oneTap = () => {
//         const { google } = window;
//         if (google) {
//             google.accounts.id.initialize({
//                 client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
//                 callback: async (response) => {
//                     // Here we call our Provider with the token provided by google
//                     call(response.credential);
//                 },
//             });

//             // Here we just console.log some error situations and reason why the google one tap
//             // is not displayed. You may want to handle it depending on your application

//             // google.accounts.id.prompt() // without listening to notification

//             google.accounts.id.prompt((notification) => {
//                 console.log(notification);
//                 if (notification.isNotDisplayed()) {
//                     console.log(
//                         'getNotDisplayedReason ::',
//                         notification.getNotDisplayedReason()
//                     );
//                 } else if (notification.isSkippedMoment()) {
//                     console.log('getSkippedReason  ::', notification.getSkippedReason());
//                 } else if (notification.isDismissedMoment()) {
//                     console.log(
//                         'getDismissedReason ::',
//                         notification.getDismissedReason()
//                     );
//                 }
//             });
//         }
//     };

//     const call = async (token: string) => {
//         try {
//             const res = await googleOneTapLogin({
//                 token,
//             });
//             console.log(res);
//             // add your logic to route to
//             // redux dispatch
//             router.push('/user');


//         } catch (error) {
//             router.push('/login');
//         }
//     };
//     return <div />;
// };

// export default GoogleOneTapLogin;