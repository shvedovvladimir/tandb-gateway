import { joiExtended } from '../../common/extensions/joi/extended-string.extension';

export const voteForJoiSchema = joiExtended.object({
    voteFor: joiExtended.extendedString().escape().trim().min(1).required(),
});