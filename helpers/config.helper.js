import supertest from 'supertest';

class ConfigHelper {
    constructor() {
        this.response = null;
    }

    async wipeData() {
        await supertest(process.env.BASE_URL)
            .delete('/users')
            .set({Authorization: `Bearer ${process.env.TOKEN}`})
            .then(res => {
                this.response = res;
            });
    }

    async getConfig() {
        await supertest(process.env.BASE_URL)
            .get('/config')
            .set({Authorization: `Bearer ${process.env.TOKEN}`})
            .then(res => {
                this.response = res;
            });
    }

        async patchConfig(users, amount) {
            await supertest(process.env.BASE_URL)
                .patch('/config')
                .send({number_of_entries: users, initial_amount: amount})
                .set({Authorization: `Bearer ${process.env.TOKEN}`})
                .then(res => {
                    this.response = res;
                });
        }
    }


    export
    default
    ConfigHelper;