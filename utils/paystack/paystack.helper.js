const key = process.env.PAYSTACK_SECRET_KEY;

import Paystack from 'paystack-api';

var paystack = Paystack(key);

export const initiate_payment = async (
    email = 'hi@hellodemola.com',
    amount = 3000,
) => {
    const paystack_amount = amount * 100
    const make_payment = await paystack.transaction.initialize({ amount: paystack_amount, email });
    return make_payment
}


export const all_customers = async () => {
 const customers  = await paystack.customer
  .list()
  .then(function(body) {
      console.log(body);
      return body
  })
  .catch(function(error) {
    console.log(error);
  });

    return customers;
}

export const verifyPaystackTransaction = async (reference) => {


    const confirm_payment = await paystack.transaction.verify({ reference })
        .then(function (body) {
            console.log(body);
            return body
        })
        .catch(function (error) {
            console.log(error);
            return error
        });

    return confirm_payment;

}

