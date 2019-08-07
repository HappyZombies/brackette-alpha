import { Inject, Service } from 'typedi';

import { generateToken } from '../utils';

@Service()
class TokenService {
  constructor(
    @Inject('logger') private logger,
    @Inject('tokensModel') private tokensModel,
  ) {}

  public async generateNewToken() {
    let token;
    try {
      token = await this.tokensModel.query().insert({ token: generateToken() });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return token;
  }

  public async findByTokenValue(tokenValue: string) {
    let token;
    try {
      token = await this.tokensModel
        .query()
        .where('token', tokenValue)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return token;
  }

  public async isTokenAvailable(givenToken: string) {
    let token;
    try {
      token = await this.tokensModel
        .query()
        .where('token', givenToken)
        .andWhere('userId', null)
        .first();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
    return token != null;
  }

  public async addUserToToken(
    userId: string,
    givenToken: string,
  ): Promise<void> {
    let token;
    try {
      token = await this.findByTokenValue(givenToken);
      await this.tokensModel
        .query()
        .patch({ userId })
        .where('id', token.id);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}

export default TokenService;
