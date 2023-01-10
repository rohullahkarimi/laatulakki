const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = "sk_test_51LOG0SL7wf9MXueDDmRy1eeSPDZ3uXIwach95VgzLKUGYPS5VO741Jp3mJOjUhO82BLzUej5GpqgZ43S4dh3sxcq00rdRa6DqZ" //process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;