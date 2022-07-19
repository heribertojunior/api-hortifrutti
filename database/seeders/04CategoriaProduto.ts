import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria'
import Produto from 'App/Models/Produto'

export default class extends BaseSeeder {
  public async run () {
    for (let iEst = 1; iEst <= 20; iEst++) {
      let categoria = await Categoria.create({
        nome: faker.commerce.department(),
        descricao: faker.lorem.sentence(),
        posicao: 1,
        estabelecimento_id: iEst,
      });
    }
  }
}
