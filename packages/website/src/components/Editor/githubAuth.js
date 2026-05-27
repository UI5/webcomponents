import { fetchAuthUrl, exchangeCodeForToken } from "./githubAPI.js";

const TOKEN_EXPIRY_KEY = 'github_token_expiry';
const TOKEN_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Handle OAuth popup window and authentication flow
 */
export const auth = async () => {
	const { authUrl, state } = await fetchAuthUrl();

	// open github oauth popup 
	const popup = window.open(authUrl, "github-auth", "width=600,height=700,scrollbars=yes,resizable=yes");

	// listen for oauth callback 
	const authResult = await new Promise((resolve, reject) => {
		const messageHandler = (event) => {
			// verify origin for security 
			if (!event.origin.includes("github.com") && !event.origin.includes("ui5-webc-playground-server.netlify.app")) {
				return;
			}

			if (event.data.type === "GITHUB_OAUTH_SUCCESS") {
				window.removeEventListener("message", messageHandler);
				popup.close();
				resolve(event.data);
			} else if (event.data.type === "GITHUB_OAUTH_ERROR") {
				window.removeEventListener("message", messageHandler);
				popup.close();
				reject(new Error(event.data.error));
			}
		};

		window.addEventListener("message", messageHandler);

		// poll for url changes in popup 
		const pollTimer = setInterval(() => {
			try {
				if (popup.closed) {
					clearInterval(pollTimer);
					window.removeEventListener("message", messageHandler);
					reject(new Error("authentication cancelled by user"));
					return;
				}

				// check if we got redirected back with code 
				const url = popup.location.href;
				if (url.includes("code=")) {
					clearInterval(pollTimer);
					window.removeEventListener("message", messageHandler);
					
					const urlParams = new URLSearchParams(new URL(url).search);
					const code = urlParams.get("code");
					const returnedState = urlParams.get("state");
					
					popup.close();
					resolve({ code, state: returnedState });
				}
			} catch (error) {
				// cross-origin restrictions prevent access to popup url 
				// continue polling until popup closes or we get a message
			}
		}, 1000);
	});

	// exchange code for token
	return exchangeCodeForToken(authResult.code, authResult.state);
};

/**
 * Manage authentication state in localStorage
 */
export const saveAuthToStorage = (token, user) => {
	const expiryTime = Date.now() + TOKEN_LIFETIME;
	
	localStorage.setItem('github_token', token);
	localStorage.setItem('github_user', JSON.stringify(user));
	localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

export const isTokenExpired = () => {
	const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
	if (!expiryTime) return true;

	return Date.now() > parseInt(expiryTime);
};

export const validateStoredAuth = () => {
	const token = localStorage.getItem('github_token');
	const userStr = localStorage.getItem('github_user');

	if (!token || !userStr || isTokenExpired()) {
		clearAuthFromStorage();
		return null;
	}

	try {
		const user = JSON.parse(userStr);
		return { token, user };
	} catch (error) {
		clearAuthFromStorage();
		return null;
	}
};

export const clearAuthFromStorage = () => {
	localStorage.removeItem('github_token');
	localStorage.removeItem('github_user');
	localStorage.removeItem(TOKEN_EXPIRY_KEY);
};
