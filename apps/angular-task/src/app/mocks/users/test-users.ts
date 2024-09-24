export const userOne = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
    },
    phone: '1-770-736-8031 x56442',
    isFavorite: false
};
export const userTwo = {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
    },
    phone: '010-692-6593 x09125',
    isFavorite: false
};

export const MockUsersFacade = {

    init: jest.fn(),
    setSelectedUser: jest.fn(),
    toggleFav: jest.fn(),
    setFilterText: jest.fn(),

};

export const MockUsersService = {

    getAll: jest.fn(),
    get: jest.fn(),
    toggleFav: jest.fn(),
    setFilterText: jest.fn(),

};
