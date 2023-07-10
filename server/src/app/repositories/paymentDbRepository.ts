import { PaymentImplInterface } from "@src/frameworks/database/mongodb/repositories/paymentRepoMongodb";
import { PaymentInfo } from "@src/types/payment";

export const paymentInterface = (repository:ReturnType<PaymentImplInterface>)=>{
    const savePayment = async(paymentInfo:PaymentInfo)=> await repository.savePaymentInfo(paymentInfo)
    return {
        savePayment
    }
}

export type PaymentInterface = typeof paymentInterface