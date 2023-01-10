const getTransactionId = event => {
  event.preventDefault();

  // what is order ID 


  // call api https://tester.laatulakki.fi/api/checkout/[orderID]
  

  // get transaction id
  const transactionId = "94b32a1a-3b30-11ed-808d-2be5646f83ae"
  const url = "https://pay.paytrail.com/pay/"+transactionId
  console.log(url)
  window.location.href=url;
 }


const Paytrail = () => {
  return (
    <div>
      <button onClick={getTransactionId}>Maksa</button>
    </div>
  )
}

export default Paytrail