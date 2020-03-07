import { joiExtended } from '../../common/extensions/joi/extended-string.extension';

export const getTokenJoiSchema = joiExtended.object().keys({
    accessKey: joiExtended.extendedString().escape().trim().min(1).required(),
});