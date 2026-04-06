import { IntegerOption, UserOption } from '../../../packages';

export class KickDto {
  @UserOption({ name: 'user', description: 'Member to kick', required: true })
  user: string;
}

export class ClearDto {
  @IntegerOption({
    name: 'amount',
    description: 'Number of messages to delete (1–100)',
    required: true,
    min_value: 1,
    max_value: 100,
  })
  amount: number;
}
