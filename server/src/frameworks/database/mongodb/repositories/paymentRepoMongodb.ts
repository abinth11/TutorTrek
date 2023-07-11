import mongoose from "mongoose";
import Payment from "../models/payment";
import { PaymentInfo } from "@src/types/payment";

export const paymentRepositoryMongodb = () => {
    const savePaymentInfo = async (paymentInfo:PaymentInfo)=>{
        const newPaymentInfo = new Payment(paymentInfo)
        const response = await newPaymentInfo.save()
        return response
    }
   return {
    savePaymentInfo
   }
}

export type PaymentImplInterface = typeof paymentRepositoryMongodb