const pools = [
    [
      { symbol: "VND", amount: 1000000 },
      { symbol: "AUD", amount: 2000000 },
    ],
    [
      { symbol: "AUD", amount: 2000000 },
      { symbol: "AUF", amount: 3000000 },
    ],
    [
      { symbol: "AUF", amount: 1000000 },
      { symbol: "AUG", amount: 4000000 },
    ],
    [
      { symbol: "AUG", amount: 4000000 },
      { symbol: "AUH", amount: 2000000 },
    ],
    [
      { symbol: "AUH", amount: 2000000 },
      { symbol: "VND", amount: 5000000 },
    ],
    [
      { symbol: "VND", amount: 5000000 },
      { symbol: "AUJ", amount: 2000000 },
    ],
    [
      { symbol: "AUJ", amount: 5000000 },
      { symbol: "USD", amount: 20000000 },
    ],
    [
      { symbol: "AUH", amount: 1000000 },
      { symbol: "AUJ", amount: 6000000 },
    ],
    [
      { symbol: "AUJ", amount: 3000000 },
      { symbol: "AUK", amount: 2000000 },
    ],
    [
      { symbol: "AUK", amount: 1000000 },
      { symbol: "USD", amount: 20000000 },
    ],
]

function findAmoutChange(fromCurrency, amout, toCurrency) {
  //Tạo danh sách mảng chứa các route chuyên đổi tiền hợp lệ
  const amoutChanged = [];

  //Hàm sử lí việc chuyển đổi với 2 đối số
  //lần lượt là mảng chứa loại tiền cần chuyển và số tiền sau khi chuyển đổi
  function handleAmoutValid(routeAmout, remainingAmount) {
    //lấy loại tiền tệ cần chuyển mới nhất
    const currentCurrency = routeAmout[routeAmout.length - 1];

    //Đẩy phần tử vào mảng khi đã đến loại tiền cần chuyển đổi
    if(currentCurrency === toCurrency) {
      const rate = amout / remainingAmount;
      amoutChanged.push({route: routeAmout, rate})
    } else {
      for(let pool of pools) {
        const [currency1, currency2] = pool;

        //Xử lí khi tìm thấy loại tiền cần chuyển trong mảng
        if(currency1.symbol === currentCurrency) {
          const nextCurrency = currency2.symbol;
          const nextAmout = remainingAmount * currency2.amount / currency1.amount;

          //Nếu loại tiền chưa có trong mảng sẽ đẩy vào đệ qui để tìm tiếp
          //Nếu có rồi sẽ bỏ qua và chuyển qua tìm kiếm tiếp các phần tử trong mảng
          //mà phần tử đầu tiền có symbol trùng với loại tiền cần chuyển đổi hiện tại
          if(!routeAmout.includes(nextCurrency)) {
            handleAmoutValid([...routeAmout, nextCurrency], nextAmout)
          }
        }
      }
    }
  }
  handleAmoutValid([fromCurrency], amout)

  return amoutChanged;
}
console.log("🚀 ~ Amout changed", findAmoutChange('VND', 1, 'USD'))
