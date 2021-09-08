import {expect} from 'chai';
import supertest from 'supertest';

describe('Auth', function () {
    let result;

    describe('Successful log in', function () {
        before(async function () {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({login: process.env.LOGIN, password: process.env.PASSWORD})
                .then(res => {
                    result = res;
                });
        });

        it('Response status code is 200', function () {
            expect(result.statusCode).to.eq(200);
        });

        it('Response body contains authorization token', function () {
            expect(result.body.token).not.to.be.undefined;
        });
    });

    describe('Log in with wrong credentials should return error', function () {
        before(async function () {
            await supertest(process.env.BASE_URL)
                .post('/auth')
                .send({login: 'wrong', password: 'wrong'})
                .then(res => {
                    result = res;
                });
        });

        it('Response status code is 404', function () {
            expect(result.statusCode).to.eq(404);
        });

        it('Response status code is 404', function () {
            expect(result.body.message).to.eq('Wrong login or password.');
        });
    });
});