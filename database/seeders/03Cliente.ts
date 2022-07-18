import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'cliente@email.com',
      password: '123456',
      tipo: 'clientes',
    });
    await Cliente.create({
      nome: 'Cliente1',
      telefone: '92 984324468',
      userId: user.id,
    });
  }
}
