import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';
import { startOfHour,parseISO,isBefore } from 'date-fns';

class AppointmentController{
    async store(req,res){
        const schema=Yup.object().shape({
            provider_id:Yup.number().required(),
            date:Yup.date().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validation fails'});
        }
        const {provider_id,date}=req.body;

        const isProvider=await User.findOne({
            where:{id:provider_id,provider:true}
        });
        if(!isProvider){
            return res
            .status(401)
            .json({error:'you can only create whith providers'});
        }
        //parseISO trasnforma string em objeto date
        //startOfHour transforma no "piso" da hora
        const hourStart=startOfHour(parseISO(date));
        
        if(isBefore(hourStart,new Date())){
            return res.status(400).json({error:'Past dates are not permitted'});
        }

        const checkAvailability=await Appointment.findOne({
            where:{
                provider_id,
                canceled_at:null,
                date:hourStart,
            }
        });
        if(checkAvailability){
            return res.status(400).json({error:'Appointment data is not avaible'});
        }
        const appointment=await Appointment.create({
            user_id:req.userId,
            provider_id,
            date:hourStart,
        });
    return res.json(appointment);
    }
}
export default new AppointmentController();