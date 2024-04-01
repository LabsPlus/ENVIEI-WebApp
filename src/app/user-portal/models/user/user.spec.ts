import { User } from './user';

describe('User', () => {
    it('Shold create an instance', () => {
        expect(new User()).toBeTruthy();
    });
});