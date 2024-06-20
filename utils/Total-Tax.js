async function calculateAndSumTaxAmounts() {
    try {
      // Fetch tax records from database or another source
      const taxRecords = await Tax.findAll();
  
      // Initialize total tax sum
      let totalTaxSum = 0;
  
      // Iterate through tax records and sum taxAmount for each record
      taxRecords.forEach(record => {
        totalTaxSum += parseFloat(record.taxAmount);
      });
  
      // Return totalTaxSum formatted to two decimal places
      return totalTaxSum.toFixed(2);
    } catch (error) {
      console.error('Error calculating and summing tax amounts:', error);
      throw error; // Handle or rethrow the error as needed
    }
  }
  