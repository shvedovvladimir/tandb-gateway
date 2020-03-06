import { joiExtended } from '../../common/extensions/joi/extended-string.extension';

export const sampleJoiSchema = joiExtended.object().keys({
    id: joiExtended.extendedString().escape().trim().min(1).optional(),
});