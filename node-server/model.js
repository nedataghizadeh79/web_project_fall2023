import {DataTypes, Op, Sequelize} from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:secretpassword@host.docker.internal:8080/postgres') // Example for postgres

const dbOpts = function (db_name) {
    return {
        tableName: db_name, createdAt: false, updatedAt: false,
    }
};

export const test_database = async function () {
    return sequelize.authenticate();
}

