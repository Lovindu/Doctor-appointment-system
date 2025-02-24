import Payment from "../models/Payment.js";
import Stripe from "stripe";
import Session from "../models/Session.js";
import Appointment from "../models/Appointment.js";

const stripe = new Stripe('sk_test_51QfHaTEIL4e7YuDxNGbYd0aDMaYhsatXRcoGGMTw0YVCjyV1JT2Guzp7GJgRQMGw0SJK1JWPWCZjRq5woe4AhKjj00MOkBt9qG');

export const createPayment = async (req, res, next) => {
    const {newPayment} = new Payment(req.body);

    try {
        const createdPayment = await newPayment.save();

        res.status(200).json(createdPayment);
    } catch(err){
        throw err;
    }
}

export const makePayment = async (req, res, next) => {
    try {
        const selectedSession = await Session.findById(req.body.id);
        if (!selectedSession) {
            return res.status(404).json({ error: "Session not found." });
        }
        const sessionFee = selectedSession.fee;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'LKR',
                    product_data: {
                        name: "you session",
                        description: "Pay amount for the selected session"
                    },
                    unit_amount: sessionFee * 100
                },
                quantity: 1
            }],
            success_url:`${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/error`,
        })

        res.status(200).json({url: session.url});

        const appointment  = new Appointment({
            sessionId: req.body.id,
            userId: req.body.userId,
            doctorId:req.body.doctorId,
            appointmentNumber: selectedSession.numberOfAppointments + 1
        }) 

        await appointment.save();
        await selectedSession.updateOne({$inc: {numberOfAppointments: 1}});
        
    } catch(err) {
        if (!res.headersSent) {
            return next(err);
        }

        // Log errors occurring after response is sent
        console.error("Error occurred after response:", err);
    }
}
