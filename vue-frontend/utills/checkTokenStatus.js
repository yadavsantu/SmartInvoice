import axios from "axios";


async function checkAuthStatus() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    if(!refreshToken)
    {
        return false
    }

    if(!accessToken || isTokenexpired(accessToken))
    {
        try
        {
            const response = await axios.post('http://localhost:8080/api/v1/refresh',
                {
                    token:refreshToken,
                },
                {
                    withCredentials: true,
                }
            )
            const newAccessToken = response.data.accessToken;
            console.log("New AccessToken",newAccessToken)
            localStorage.setItem('accessToken' , newAccessToken)
            return  true;
        }
        catch(err)
        {console.log('Token refresh Failled:',err.response?.data,err)}
        return false;
    }
    return true;
}

function isTokenexpired(token) {
    try {
        if (!token || token.split('.').length !== 3) {
            throw new Error("Invalid token structure");
        }

        const [, payload] = token.split('.'); 
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/'); // Handle Base64 URL encoding
        const decodedPayload = JSON.parse(atob(base64));

        if (!decodedPayload.exp) {
            throw new Error("Token does not contain an 'exp' field");
        }

        return Date.now() >= decodedPayload.exp * 1000; // Check expiration
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return true; 
    }
}
export default checkAuthStatus;
