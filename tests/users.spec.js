import {expect} from 'chai';
import UsersHelper from '../helpers/users.helper';
import ConfigHelper from '../helpers/config.helper';
import {getRandomItem} from '../helpers/common.helper';

describe('Users', function () {
    let usersHelper = new UsersHelper();
    let config = new ConfigHelper();

    describe('Create user', function () {
        before(async function () {
            await usersHelper.create();
        });

        it('Verify user status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Verify user id', function () {
            expect(usersHelper.response.body.id).not.to.be.undefined;
        });

        it('Verify user amount', function () {
            expect(usersHelper.response.body.amount).not.to.be.undefined;
        });
    });

    describe('User deletion', function () {
        before(async function () {
            await usersHelper.create();
            await usersHelper.delete(usersHelper.response.body.id);
        });

        it('Verify user status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response body contains message', function () {
            expect(usersHelper.response.body.message).to.eq('User deleted.');
        });
    });

    describe('Get all', function () {
        before(async function () {
            for await(const user of Array(3)) {
                await usersHelper.create();
            }
            await usersHelper.getAll();
        });

        it('Verify user status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response body contains list of 3 and more items', function () {
            expect(usersHelper.response.body.length).to.be.at.least(3);
        });

        it('Response body list item contains user id', function () {
            expect(getRandomItem(usersHelper.response.body).id).not.to.be.undefined;
        });

        it('Response body list item contains amount', function () {
            expect(getRandomItem(usersHelper.response.body).amount).not.to.be.undefined;
        });
    });

    describe('Get specific user', function () {
        before(async function () {
            await usersHelper.create();
            await usersHelper.getSpecific(usersHelper.response.body.id);
        });

        it('Verify user status code is 200', function () {
            expect(usersHelper.response.statusCode).to.eq(200);
        });

        it('Response body contains user id', function () {
            expect(getRandomItem(usersHelper.response.body).id).not.to.be.undefined;
        });

        it('Response body contains amount', function () {
            expect(getRandomItem(usersHelper.response.body).amount).not.to.be.undefined;
        });
    });

    after(async function () {
        await config.wipeData();
    })
});



