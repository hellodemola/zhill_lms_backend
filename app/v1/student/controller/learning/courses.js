import crypto from 'crypto';
import { handleError, handleExpection, handleResp } from "../../../../../utils/helper.js"
import { initiate_payment, verifyPaystackTransaction } from "../../../../../utils/paystack/paystack.helper.js";
import { GET_ALL_LANDING_PAGE_MATRICS_SERVICES, MY_COURSES_SERVICES, SAVE_PAYEMENT_REF_SERVICES, SEARCH_SERVICES } from "../../services/courses/courses.services.js";
import { UPDATE_STUDENT_SUB } from '../../services/payment/payments.services.js';

const secret = process.env.PAYSTACK_SECRET_KEY

export const LEARNING_CONTROLLER = async(req, res, next) => {
    try {
        const data = await GET_ALL_LANDING_PAGE_MATRICS_SERVICES();
        return handleResp(
            res,
            200,
            "successfully",
            data,
        )


    } catch (error) {
        handleExpection(next, error)
    }
}

export const SEARCH_CONTROLLER = async (req, res, next) => {
    try {
        const { course: search } = req.query;
        if (!search) return handleResp(res, 404, "Nothing search from");
        const found_result = await SEARCH_SERVICES(search);
        if (found_result?.isError) return handleResp(res, 404, found_result?.errorMessage);
        return handleResp(res, 200, "Found successfully", found_result?.data);
    } catch (error) {
        handleExpection(next, error);
    }
}

export const INTIALIZE_PAYSTACK_PAYMENT = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const email = req.user
        const initialize = await initiate_payment(email, amount);
        if (!initialize) return handleResp(
            res,
            400,
            "Unable to initialize payment");
        req.ref = initialize?.data?.reference;
         req.activity = `${email} invoiced course ${req.body.id}`
        req.data = initialize;
        next()
    } catch (error) {
        handleExpection(next, error)
    }

};

export const VERIFY_PAYSTACK_PAYMENT = async (req, res) => {
       try {
           const { ref } = req.body;
           const verify = await verifyPaystackTransaction(ref);
           if (verify?.error) {
               return handleResp(
                   res,
                   verify?.statusCode,
                   verify?.error?.message
               )
           }
           await UPDATE_STUDENT_SUB(verify);
           return handleResp(
               res,
               200,
               verify?.message
       )

       } catch (error) {
           console.log({error})
            return res.json({error})
       }


}

export const SAVE_PAYEMENT_REF = async (req, res, next) => {
    try {
        const student_id = req.user_id;
        const {course_id, amount} = req.body;
        const payment_ref = req.ref;


        await
            SAVE_PAYEMENT_REF_SERVICES(payment_ref, student_id, course_id, amount);
        next();
    } catch (error) {
        handleExpection(next, error)
    }
}

export const PAYSTACK_HOOK_SETUP = async (req, res, next) => {
    try {
    //validate event
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event
      console.log({ event })

    }
  //console.log({ req: req?.body, hash, headers: req.headers })
  await UPDATE_STUDENT_SUB(req?.body)

  res.send(200);
//   next();

    } catch (error) {
        handleExpection(next, error)
    }
}

export const MY_COURSES_CONTROLLER = async (req, res, next) => {
    try {
        const current_user = req.user;
        const find_all_subscription = await MY_COURSES_SERVICES(current_user);
        handleResp(
            res,
            200,
            "Successful",
            find_all_subscription
        )

    } catch (error) {
        handleExpection(next, error)

    }
}
