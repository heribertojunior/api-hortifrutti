import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cidade from 'App/Models/Cidade';
import CidadesEstabelecimento from 'App/Models/CidadesEstabelecimento';
import Estabelecimento from 'App/Models/Estabelecimento';
import Estado from 'App/Models/Estado';
import User from 'App/Models/User';
import {faker} from "@faker-js/faker";

export default class extends BaseSeeder {
    public async run () {
    const user = await User.create({
      email: 'estabelecimento@email.com',
      password: '123456',
      tipo: 'estabelecimentos',
    });
    await Estabelecimento.create({
      nome: 'Estabelecimento1',
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
      online: true,
      bloqueado: false,
      userId: user.id,
    });
    for(let i = 2; i <= 20; i++) {
      await User.create({
      email: 'estabelecimento'+i+'@email.com',
      password: '123456',
      tipo: 'estabelecimentos',
      });
    }

    for(let i = 2; i <= 20; i++) {
      await Estabelecimento.create({
      nome: 'Estabelecimento '+i+'',
      logo: 'https://picsum.photos/id/'+i+'/200/200',
      online: true,
      bloqueado: false,
      userId: i,
      });
    }

    await Estado.createMany([{
      nome: "Minas Gerais",
      uf: "MG",
    },{
      nome: "Amazonas",
      uf: "AM",
    },{
      nome: "São Paulo",
      uf: "SP",
    }]);

    await Cidade.createMany([
      {
        nome:"Aimorés",
        estados_id: 1
      },
      {
        nome:"Manaus",
        estados_id: 2
      },
      {
        nome:"Diadema",
        estados_id: 3
      },
    ]);

    for(let i = 1; i<=20; i++){
      await CidadesEstabelecimento.create({
        cidade_id: faker.datatype.number({min:1, max:3}),
        estabelecimento_id: i,
        custo_entrega: faker.datatype.float({min: 1,max:3, precision: 0.01})
      })
    }

  }

  }

