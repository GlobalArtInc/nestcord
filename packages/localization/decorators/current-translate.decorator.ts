import { createParamDecorator } from '@nestjs/common';
import { LocalizationInterceptor } from '../interceptors';

export const CurrentTranslate = createParamDecorator(() =>
	LocalizationInterceptor.getCurrentTranslationFn()
);
