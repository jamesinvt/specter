import React from 'react';
import useFetch from '../../hooks/useFetch';


const Login = () => {
	const request = useFetch('/remote/auth/tmdb-login');
	// const request = useFetch('/remote/graphql');
	const handleClick = async () => {
		const result = await request.get();
		// const results = await request.query(`
		// 	mutation createRequestToken {
		// 		requestResponse: createRequestToken {
		// 			success
		// 			request_token
		// 		}
		// 	}`
		// )
		console.log(result)

	
		window.location = `https://www.themoviedb.org/auth/access?request_token=${result.request_token}&redirect_to=http://localhost:3000/auth-callback&rtoken=${result.request_token}&callback=test`;
		// const results2 = await request.query(`
		// 	mutation createAccessToken($request_token: String ) {
		// 		accessTokenResponse: createAccessToken(params: {request_token: $request_token}) {
		// 			success
		// 			account_id
		// 			access_token
		// 			status_code
		// 		}
		// 	}`, {request_token: results.requestResponse.request_token}
		// )

		console.log({results2})
	}
	return (
		<div onClick={handleClick}> 
			LOGIN
		</div>
	);
};

export default Login;
