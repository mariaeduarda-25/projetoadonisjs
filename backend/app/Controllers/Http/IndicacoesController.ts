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

  public async show({params, response}: HttpContextContract) {
    try {
      const indicBD = await Indicacoe.findOrFail(params.id)
      return indicBD 
    } catch (error) {
      response.status(400).send("Indicação não encontrada!")
    }
  }

  public async update({request, params, response}: HttpContextContract) {
    try {
      const indicBD = await Indicacoe.findOrFail(params.id)
      const {locais} = await request.validate(StoreIndicacoeValidator)
      //const indicBD = await Indicacoe.create({...data, userId: auth.user?.id})
      indicBD.locais = locais 
      await indicBD.save()
      return indicBD

    } catch (error) {
      response.status(400).send("Indicação não encontrada!")
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const indicBD = await Indicacoe.findOrFail(params.id)
      await indicBD.delete()
      return  indicBD
    } catch (error) {
      response.status(400).send("Indicação não encontrada!")
    }
  }
}
