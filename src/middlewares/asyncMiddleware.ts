import { NextFunction, Request, Response } from 'express'

/**
 * Simple middleware for handling exceptions inside of async express routes and passing
 * them to your express error handlers.
 * @param fn
 * @returns {(req: e.Request, res: e.Response, next: e.NextFunction) => void}
 */
const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

export default asyncMiddleware
