import React from 'react';
import useFetch from '../../hooks/useFetch';


const Login = () => {
	// const request = useFetch('/remote/auth/request_token');
	const request = useFetch('/remote/graphql');
	useEffect(() => {
		const results = await request.query(`
			mutation createAccessToken($request_token: String! ) {
				accessTokenResponse: createAccessToken(params: {request_token: $request_token}) {
					success
					account_id
					access_token
					status_code
				}
			}`, {request_token: `${results.requestResponse.request_token}`}
		)
	})
	return (
		<div> 
			LOGGED IN
		</div>
	);
};

export default Callback;
