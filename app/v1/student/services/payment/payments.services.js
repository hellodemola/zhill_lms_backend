import { change_subscription_status, find_subscription_by_ref, update_subscription_status } from "../../../course/queries/students/courses.students.queries.pq.js";

const CREATE_COURSE_INVOICE_SERVICE = async () => {
    // const initiate_paystack_payment = await
    const create_invoice = {
        user: {
            email: ""
        },
        payment_details: {
            paystack_key: "",
            amount: 0,
        },
        currency_id: "",
    }

    return create_invoice;

}

const UPDATE_STUDENT_SUB = async (data) => {

  try {
  // check header
  if (data.event === 'charge.success') {
    // find the status of account
    const ref = data?.data?.reference;
    const order = await find_subscription_by_ref(ref);
    console.log(order)
    if (order.status !== 'active') {
      // update account type
      await change_subscription_status(order.payment_ref, 'active')
      // send customer email
      // await sendEmailOrder(ref)
    }
  }
  } catch (error) {
    console.log(error)
  }


}

export { CREATE_COURSE_INVOICE_SERVICE, UPDATE_STUDENT_SUB }
