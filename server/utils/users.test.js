const expect = require('expect');

const {Users} = require('./users');

describe('test Users class', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 'id1',
            name: 'Mike',
            room: 'A'
        }, {
            id: 'id2',
            name: 'Mikey',
            room: 'B'
        }, {
            id: 'id3',
            name: 'Melanie',
            room: 'B'
        }];
    });

    it('should add user to array', () => {
       var user = {
           id: 'fgdhfds',
           name: 'Mike',
           room: 'A'
       };

       var users = new Users();
       var resUser = users.addUser(user.id, user.name, user.room);
       expect(users.users).toEqual([resUser]);

    });

    it('should remove a user', () => {
        var testId = users.users[0].id;
        var user = users.removeUser(testId);
        expect(user.id).toEqual(testId);
        expect(users.users.length).toEqual(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('badid');
        expect(user).toEqual(undefined);
        expect(users.users.length).toEqual(3);
    });

    it('should get a user by id', () => {
        var user = users.getUser(users.users[0].id);
        expect(user.id).toEqual(users.users[0].id);
    });

    it('should not get a user by bad id', () => {
        var user = users.getUser('badid');
        expect(user).toEqual(undefined);
    });

    it('should return users for A room', () => {
        var userList = users.getUserList('A');
        expect(userList).toEqual(['Mike']);
    });

    it('should return users for B room', () => {
        var userList = users.getUserList('B');
        expect(userList).toEqual(['Mikey', 'Melanie']);
    });
});