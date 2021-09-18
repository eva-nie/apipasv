import {expect} from 'chai';
import ConfigHelper from '../helpers/config.helper';
import UsersHelper from "../helpers/users.helper";
let numberOfEntries = 25;
let initialAmount = 1000;
let numberUpdate = 20;
let amountUpdate = 600;
// const info = {
//     "number_of_entries": 25,
//     "initial_amount": 1000
// }

describe('Config', function () {
    const configHelper = new ConfigHelper();
    const usersHelper = new UsersHelper();

    describe('Get config', function () {
        before(async function () {
            await configHelper.getConfig();
        });

        it('Response status code is 200', function () {
            expect(configHelper.response.statusCode).to.eq(200);
        });

        it('response contains default number of entries', function () {
            expect(configHelper.response.body.number_of_entries).to.eq(numberOfEntries);
        });

        it('response contains default initial amount', function () {
            expect(configHelper.response.body.initial_amount).to.eq(initialAmount);
        });
    })

    describe('Patch config', function () {
        before(async function () {
            await configHelper.patchConfig(numberUpdate, amountUpdate);
        });

        after(async function () {
            await configHelper.wipeData();
        });

        it('Amount updated correctly', function () {
            expect(configHelper.response.body.initial_amount).to.eq(amountUpdate);
        });

        it('Updated number of entries is correct', function () {
            expect(configHelper.response.body.number_of_entries).to.eq(numberUpdate);
        });
    })

    describe('User creation with updated config', function () {
        before(async function () {
            await configHelper.patchConfig(numberUpdate, amountUpdate);
            await usersHelper.create();
        });

        it('User body contains updated amount', function () {
            expect(usersHelper.response.body.amount).to.eq(amountUpdate);
        });
    });
});
