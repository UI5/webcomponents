const URL_SHORTEN_API = "https://linkshortener.int.sap/api/url";

export default async function shortenURL(longUrl) {
	if (process.env.NODE_ENV === 'development' ) {
		return;
	}

	const URL_SHORTEN_API_KEY = process.env.URL_SHORTENER_API_KEY;

	if (!URL_SHORTEN_API_KEY) {
		console.warn("URL shortener API key not available.");
		return "";
	}

	try {
		const payload = {
			longUrl: longUrl.trim(),
		};

		const response = await fetch(URL_SHORTEN_API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"ApiKey": URL_SHORTEN_API_KEY,
				"X-Requested-With": "XMLHttpRequest"
			},
			body: JSON.stringify(payload),
			credentials: "include"
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Failed to create short url:", errorData);
			return "";
		}

		const data = await response.json();
		console.log("Short url created successfully:", data.shortUrl);
		return data.shortUrl;
	} catch (error) {
		console.error("Error creating short url:", error);
		return "";
	}
}
