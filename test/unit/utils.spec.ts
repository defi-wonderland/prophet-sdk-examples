import { expect } from 'chai';
import { toUnit } from '../../src/utils';

describe('toUnit', () => {
  it('should return the correct requestId for full request datavalue', async () => {
    const result = toUnit(5000000000000000000);

    expect(result).to.equal('5');
  });
});
