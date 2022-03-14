const loanservice = require('../server/protos/loan_grpc_pb');
const loan = require('../server/protos/loan_pb');

var grpc = require("grpc");


function getLoans(call, callback) {
  const customerid = call.request.getCustomerid();
  let count =0;
  console.log('request recieved', customerid);
  let intervalId = setInterval(function (){
      const getLoansResponse = new loan.LoanResponse();

      //core logic

      getLoansResponse.setLoanid(`${count} 99999`);
      getLoansResponse.setStatuscode(1);
      getLoansResponse.setClosingamount(1000+count);
      call.write(getLoansResponse);
      count = count +5;
      if (count >= 1000){
          clearInterval(intervalId)
          call.end();
      }
  }, 1000);
}
function main() {
    var server = new grpc.Server();
    server.addService(loanservice.LoanServiceService, {
      getLoans: getLoans
    });
    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();
  
    console.log("Server running on port 127.0.0.1:50051");
}
main()
