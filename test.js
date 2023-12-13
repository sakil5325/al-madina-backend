require("dotenv").config();
const connectDB = require("./db/connect");
const User = require("./models/user");
const userData = require("./users.json");
const paymentJson = require("./payment.json");
const fs = require('fs/promises');
const util = require('util');

const getNextMonthFirstDate = (currentDate) => {
  // Clone the current date
  const nextDate = new Date(currentDate);

  // Set the date to the 1st of the next month
  nextDate.setMonth(nextDate.getMonth() + 1, 1);

  return nextDate;
}

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URL);
    // await User.create(userData);
    const myData = await User.findOne({UserId: 1});
    console.log(myData)
    console.log("Inserted data successfully!");
    // const start = new Date("2021-01-01");
    // const end = new Date("2023-10-28");
    // let loop = new Date(start);
    // const paymentData = [];
    // const users = await User.find();
    // while (loop <= end) {
    //   for (let i = 0; i < users.length; i++) {
    //     let item = {};
    //     item["UserId"] = users[i].UserId;
    //     item["PaidAmount"] = 300;
    //     item["PaymentMode"] = 1;
    //     item["PaymentReceivedBy"] = 5;
    //     item["DateOfPayment"] = loop;
    //     item["DateOfMonthlyPay"] = loop;
    //     item["createdAt"] = loop;
    //     paymentData.push(item);
    //   }
    //   //let newDate = loop.setMonth(loop.getMonth() == 12 ? 1 : loop.getMonth() + 1);
    //   loop = new Date(getNextMonthFirstDate(loop));
    // }

    // paymentData.sort((a, b) => {
    //     return a.UserId - b.UserId;
    // });

    // // Write the payment data to a JSON file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile('./payment.json', JSON.stringify(paymentData, null, 2), 'utf8');
    // console.log("Payment data has been written to payment.json");
  } catch (error) {
    console.log(error);
  }
};

start();
