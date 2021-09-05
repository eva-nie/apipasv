import { expect } from 'chai';
import supertest from 'supertest';

describe('Auth', function(){
    const request = supertest(process.env.BASE_URL);

    it('Successful login', function(){
        request
            .post('/auth')
            .send({login: process.env.LOGIN, password: process.env.PASSWORD})
            .end(function(err, res){
                expect(res.statusCode).to.eq(200);
                expect(res.body.token).not.to.be.undefined;
            });
    });

    it('Log in with wrong credentials should return error', function(){
        request
            .post('/auth')
            .send( { login: 'wrong', password: 'wrong' })
            .end(function(err, res) {
                expect(res.statusCode).to.eq(404);
                expect(res.body.message).to.eq('Wrong login or password.');
            });
    });

});