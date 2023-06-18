'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        username: 'AdminMekdi',
        email: 'AdminMekdi@gmail.com',
        password: '$2b$10$iziX77RsgjftuB20gtBhdO0m3xPIBjL/Wx3ZjE1O5pJONLGyi//Jy',
        verified: true,
        fullname: 'Admin Mekdi',
        bio: 'Halo saya mimin mekdi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'CashierMekdi',
        email: 'CashierMekdi@gmail.com',
        password: '$2b$10$WK1I0YRi9lEBDTvNCuTmV.62RlCEJ4wdP6Bhyojlg54jXNHL.CKsa',
        verified: false,
        fullname: 'Cashier Mekdi',
        bio: 'Halo saya kerja di mekdi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
