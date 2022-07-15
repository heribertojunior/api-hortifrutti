import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from "App/Models/Cliente";
import Admin from "App/Models/Admin";
import Estabelecimento from "App/Models/Estabelecimento";

export default class AuthController {
  public async login({ auth, request, response}: HttpContextContract){
      const email = request.input('email');
      const password = request.input('password');

      try {
        const user =  await User.findByOrFail("email", email);
        let expira;
        switch(user.tipo){
          case "clientes":
            expira ="30days";
            break;
          case "estabelecimentos":
            expira ="7days";
            break;
          case "admins":
            expira ="1days";
            break;
          default:
            expira="30days"
          }
          const token = await auth.use("api").attempt(email, password,{expiresIn: expira,  name: user.serialize().email,} );
          response.ok(token);
        }catch{
        return response.badRequest("Invalid credentials");
      }
  }
  public async logout({auth,response}: HttpContextContract){

      await auth.use("api").revoke();
    return response.ok({revoked: true,});
  }

  public async me({auth,response}: HttpContextContract){
  const userAuth = await auth.use("api").authenticate();
  const user = await User.findByOrFail("id", userAuth.id);

  let data;
  switch(userAuth.tipo){
    case "clientes":
      const cliente = await Cliente.findByOrFail("userId", user.id);
      data = {id_cliente: cliente.id,nome_cliente: cliente.nome,telefone: cliente.telefone,email: user.email}
      break;
    case "estabelecimentos":
      const estabelecimento = await Estabelecimento.findByOrFail("userId", user.id);
      data = {id_estabelecimento: estabelecimento.id,nome_estabelecimento: estabelecimento.nome,logo_estabelecimento: estabelecimento.logo,email: user.email,online_estabelecimento: estabelecimento.online,bloqueado_estabelecimento:estabelecimento.bloqueado}
      break;
    case "admins":
      const admin = await Admin.findByOrFail("userId", user.id);
      data = {id_admin: admin.id,nome_admin: admin.nome,email: user.email}
      break;
    default:
      return response.unauthorized("Unauthorized user, type not founded");
      break;
  }
  return response.ok(data);

  }

}
