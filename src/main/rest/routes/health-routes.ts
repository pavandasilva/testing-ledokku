import { Router, Request, Response } from 'express';
const priceRoutes = Router();

priceRoutes.get('/price', async (_: Request, response: Response) => {
    response.json({ ok: true})
});

export { priceRoutes }