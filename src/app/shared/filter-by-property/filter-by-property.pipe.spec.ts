import {productsMock} from '../products/products.mock';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

describe('FilterByPropertyPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterByPropertyPipe();

        expect(pipe).toBeTruthy();
    });

    it('Фильтрация по имени', () => {
        const pipe = new FilterByPropertyPipe();

        const value = pipe.transform(productsMock, 'name', productsMock[0].name);

        expect(value).toEqual([productsMock[0]]);
    });

    it('Фильтрация по не существующему имени', () => {
        const pipe = new FilterByPropertyPipe();

        const value = pipe.transform(productsMock, 'name', 'Egor');

        expect(value).toEqual([]);
    });

    it('Фильтрация по пустому имени', () => {
        const pipe = new FilterByPropertyPipe();

        const value = pipe.transform(productsMock, 'name', '');

        expect(value).toEqual(productsMock);
    });
});
