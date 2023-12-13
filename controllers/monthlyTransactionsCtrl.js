const MonthlyTransactions = require("../models/monthlyTransaction");
const User = require("../models/user");
const { getUserNameByID } = require("./usersCtrl");

const getAllMonthlyTransactions = async (req, res) => {
    const myData = await MonthlyTransactions.find().sort({DateOfPayment : -1, UserId : 1}).limit(39, function (e, d) {});
    res.status(200).json({ myData })
};

const getAllMonthlyTransactionsTesting = async (req, res) => {
    const myData = await MonthlyTransactions.find();
    res.status(200).json({ myData })
};

const getDashboardStats = async (req, res) => {
    // total monthly savings
    const myData = await MonthlyTransactions.aggregate([
        {
          $group: {
            _id: null, // This groups all documents into a single group
            totalMonthlySavings: {
              $sum: '$PaidAmount' // Sum the values of the 'fieldName' field
            }
          }
        }
    ]);
    const totalMonthlySavings = myData[0].totalMonthlySavings

    // Get the current date
    const currentDate = new Date();

    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1

    const myData1 = await MonthlyTransactions.aggregate([
        {
            $match: {
            // Filter documents for the current year and month
            DateOfMonthlyPay: {
                $gte: new Date(`${currentYear}-${currentMonth}-01`),
                $lt: new Date(`${currentYear}-${currentMonth + 1}-01`)
            }
            }
        },
        {
            $group: {
            _id: null, // This groups all documents into a single group
            totalCurrentMonthSavings: {
                $sum: '$PaidAmount' // Sum the values of the 'fieldName' field
            }
            }
        }
    ])

    const totalCurrentMonthSavings = myData1[0]?.totalCurrentMonthSavings > 0 ? myData1[0].totalCurrentMonthSavings : 0;

    //console.log(currentYear+"::"+currentMonth);

    res.status(200).json({ totalMonthlySavings, totalCurrentMonthSavings })
};

module.exports = {getAllMonthlyTransactions, getAllMonthlyTransactionsTesting, getDashboardStats}