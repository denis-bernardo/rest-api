import UserAccess from 'allied-backend-commons/lib/models/UserAccess';
import UserProfiles from 'allied-backend-commons/lib/models/UserProfiles';
import UserProfilesHasAccess from 'allied-backend-commons/lib/models/UserProfilesHasAccess';
import BaseRepository from 'allied-backend-commons/lib/repositories/BaseRepository';

export default class UserProfilesHasAccessRepository extends BaseRepository<UserProfilesHasAccess> {
  protected model = UserProfilesHasAccess;

  protected include = [UserAccess, UserProfiles];

  public async bulkCreate(data: object[]) {
    return this.model.bulkCreate(data);
  }

  public async removeAllByProfileId(profileId: number) {
    return await this.model.destroy({ where: { profileId }});
  }
}
