import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PedidoStatus from './PedidoStatus'
import Estabelecimento from './Estabelecimento'
import PedidoEndereco from './PedidoEndereco'
import MeiosPagamento from './MeiosPagamento'
import PedidoProduto from './PedidoProduto'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true ,serializeAs: null})
  public id: number;

  @column()
  public hash_id: string;

  @column()
  public cliente_id: number;

  @column()
  public estabelecimento_id: number;

  @column()
  public meio_pagamento_id: number;

  @column()
  public pedido_endereco_id: number;

  @column()
  public valor: number;

  @column()
  public troco_para: number | null

  @column()
  public custo_entrega: number;

  @column()
  public observacao: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  //ligação com cliente
  @hasOne(() => Cliente,{
    foreignKey:'id',
    localKey: 'cliente_id',
  })
  public cliente: HasOne<typeof Cliente>;

  //Ligação com pedido_status para acessar status
  @hasMany(() => PedidoStatus,{
    foreignKey:'pedido_id',
    localKey: 'id',
  })
  public pedido_status: HasMany<typeof PedidoStatus>;

  //ligação com estabelecimento
  @hasOne(() => Estabelecimento, {
    foreignKey:'id',
    localKey: 'estabelecimento_id'
  })
  public estabelecimento: HasOne<typeof Estabelecimento>;

  //ligação com pedido_endereco para acessar endereco
  @hasOne(() => PedidoEndereco, {
    foreignKey:'id',
    localKey: "pedido_endereco_id",
  })
  public endereco: HasOne<typeof PedidoEndereco>;

  //Ligação com meio_magamento
  @hasOne(() => MeiosPagamento, {
    foreignKey:'id',
    localKey: "meio_pagamento_id",
  })
  public meio_pagamento: HasOne<typeof MeiosPagamento>;

  //ligação com pedido_produto para conseguir acessar produtos
  @hasMany(() => PedidoProduto,{
    foreignKey: "pedido_id",
    localKey: "id",
  })
  public produtos: HasMany<typeof PedidoProduto>;
}
