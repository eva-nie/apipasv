import TransactionsHelper from '../helpers/transactions.helper';
import UsersHelper from '../helpers/users.helper';
import {expect} from 'chai';

describe.skip('Transactions', function (){
    let transactionsHelper = new TransactionsHelper();
    let usersHelper = new UsersHelper();
    let userId1;
    let userId2;
    let amount = 1;
    let transactionId;

    describe('Transaction creation', function(){
        before (async function (){
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);
        });

        it('Response status code is 200',  function (){
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        it('Response body contains transaction id', async function (){
            expect(transactionsHelper.response.body.id).to.exist;
        });

        it('Response body contains correct sender id', async function (){
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        })

        it('Response body contains correct receiver id', async function (){
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('Response body contains correct amount', async function (){
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });
    });


    describe('Get transaction by id', function (){
        before(async function (){
            await usersHelper.create();
            userId1 = usersHelper.response.body.id;
            await usersHelper.create();
            userId2 = usersHelper.response.body.id;
            await transactionsHelper.transactionCreation(userId1, userId2, amount);
            transactionId = transactionsHelper.response.body.id;
            await transactionsHelper.getTransactionById(transactionId);
        });

        it('Response body contains transaction id', async function (){
            expect(transactionsHelper.response.body.id).to.eq(transactionId);
        });

        it('Response body contains only object', async function (){
            expect(transactionsHelper.response.body).to.be.an('object');
        });

        it('Response status code is 200', async function (){
            expect(transactionsHelper.response.statusCode).to.eq(200);
        });

        // it('Response body contains only one item', async function (){
        //     expect(transactionsHelper.response.body.length).to.eq(undefined);
        // });

        it('response body contains correct sender user id', async function () {
            expect(transactionsHelper.response.body.from).to.eq(userId1);
        });

        it('response body contains correct receiver user id', async function () {
            expect(transactionsHelper.response.body.to).to.eq(userId2);
        });

        it('response body contains correct amount', async function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount);
        });
    });
});