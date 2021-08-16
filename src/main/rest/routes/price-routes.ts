import { Router, Request, Response } from 'express';
import { getAssetPrice } from '../../../services';
const healthRoutes = Router();

healthRoutes.get('/price/:asset', async (request: Request, response: Response) => {
	try {
		const price = await getAssetPrice(request.params.asset)
		response.json({
			price
		})
	} catch (error) {
		response.status(500).json({
			error
		})
	}
});

export { healthRoutes }