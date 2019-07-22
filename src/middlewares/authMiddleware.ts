import { Request, Response, NextFunction } from 'express'
import asyncFn from './asyncMiddleware'
import ForbiddenException from '../exceptions/ForbiddenException'
import UnauthorizedException from '../exceptions/UnauthorizedException'
import * as CognitoExpress from 'cognito-express'
import IAuthUser from '../interfaces/IAuthUser'

const getTokenFromRequest = (req: Request) => {
  let token

  if (req.headers.Authorization || req.headers.authorization) {
    const regexValidBearerToken = /Bearer\s[a-zA-Z0-9.\-_]+/
    const authorizationHeader = (req.headers.Authorization || req.headers.authorization) as string
    if (!regexValidBearerToken.test(authorizationHeader)) {
      throw new ForbiddenException('Invalid token format, should match bearer pattern')
    }
    token = (authorizationHeader).split('Bearer')[1]
  }

  if (!token) {
    throw new UnauthorizedException('No token provided')
  }

  return token.trim()
}

const formatResponse = (response: any): IAuthUser => {
  return {
    email: response.email,
    id: response.id,
    businesses: JSON.parse(response['custom:businesses']),
    business: response['custom:business'],
    permissions: JSON.parse(response['custom:permissions']),
    professionalId: response['custom:professionalId'],
    isAdmin: !!response['custom:isAdmin']
  }
}

const validateToken = (token: string) => {
  const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_COGNITO_REGION,
    cognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    tokenUse: 'id', // Possible Values: access | id
    tokenExpiration: 3600000
  })

  return new Promise<IAuthUser>((resolve, reject) => {
    cognitoExpress.validate(token, (err: Error, response: any) => {
      if (err) reject(err)

      const authUser = formatResponse(response)

      if (!authUser.isAdmin) {
        reject(new UnauthorizedException('access denied'))
      }

      resolve(authUser)
    })
  })
}

const authMiddleware = asyncFn(async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromRequest(req)

  try {
    const response = await validateToken(token)
    req.user = response
    console.log(req.user)
    next()
  } catch (err) {
    console.error(err)
    throw new UnauthorizedException('Invalid token')
  }
})

export default authMiddleware
