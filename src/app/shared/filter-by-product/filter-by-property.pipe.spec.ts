import {FilterByProperty} from './filter-by-property';

describe('FilterByProperty', () => {
    it('create an instance', () => {
        const pipe = new FilterByProperty();

        expect(pipe).toBeTruthy();
    });
});
