const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, appointmentId, lawyerName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        appointmentId,
        lawyerName
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
