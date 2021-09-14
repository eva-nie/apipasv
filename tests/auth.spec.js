import {expect} from 'chai';
import AuthHelper from '../helpers/auth.helper';

describe('Auth', function () {
    let authHelper = new AuthHelper();

    describe('Successful log in', function () {
        before(async function () {
            await authHelper.get(process.env.LOGIN, process.env.PASSWORD);
        });

        it('Response status code is 200', function () {
            expect(authHelper.response.statusCode).to.eq(200);
        });

        it('Response body contains authorization token', function () {
            expect(authHelper.response.body.token).not.to.be.undefined;
        });
    });

    describe('Log in with wrong credentials should return error', function () {
        before(async function () {
            await authHelper.get( 'invalid', 'invalid');
        });

        it('Response status code is 404', function () {
            expect(authHelper.response.statusCode).to.eq(404    );
        });

        it('Response status code is 404', function () {
            expect(authHelper.response.body.message).to.eq('Wrong login or password.');
        });
    });
});