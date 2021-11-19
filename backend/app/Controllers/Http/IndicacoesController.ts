import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Indicacoe from 'App/Models/Indicacoe'
import StoreIndicacoeValidator from 'App/Validators/StoreIndicacoeValidator'

export default class IndicacoesController {
  public async index({}: HttpContextContract) {
    const indicBD = await Indicacoe.all()
    return indicBD
  }

  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreIndicacoeValidator)
    const indicBD = await Indicacoe.create({...data, userId: auth.user?.id})
    return indicBD
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
