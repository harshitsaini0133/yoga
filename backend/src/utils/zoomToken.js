// import axios from "axios";

// export const getZoomAccessToken = async () => {
//   const clientId = process.env.ZOOM_CLIENT_ID;
//   const clientSecret = process.env.ZOOM_CLIENT_SECRET;
//   const response = await axios.post(
//     "https://zoom.us/oauth/token",
//     `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     },
//   );
//   return response.data.access_token;
// };

import axios from "axios";

export const getZoomAccessToken = async () => {
  try {
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;
    const accountId = process.env.ZOOM_ACCOUNT_ID;

    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "account_credentials",
        account_id: accountId,
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.log("Zoom Token Error:", error);
    throw error;
  }
};
