import axios from 'axios';

const bingImagesConfig = {
	subscriptionKey: '8d432a81b1d04abc9d6d6e27c8afaa7d',
	host: 'api.cognitive.microsoft.com',
	path: '/bing/v7.0/images/search'
};

const instance = axios.create({
	baseURL: `https://${bingImagesConfig.host}${bingImagesConfig.path}`,
	headers: {'Ocp-Apim-Subscription-Key': bingImagesConfig.subscriptionKey}
});

export default instance;