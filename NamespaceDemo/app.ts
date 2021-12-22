/// <reference path="utility-functions.ts" />

const booksAllowed = Utility.maxBooksAllowed(22);
console.log(booksAllowed);

import util = Utility.Fees;

// const lateFee = Utility.Fees.calculateLateFee(3);
const lateFee = util.calculateLateFee(3);
console.log(lateFee);


