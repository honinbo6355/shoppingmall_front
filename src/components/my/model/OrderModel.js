class OrderModel {
    orderId = '';
	userId = '';
	goodsId = '';
	goodsCount = 0;
	orderPrice = ''; //제품가격 benefit
	orderDate = '';
	selectedOptions = '';
	
    orderState = {};
    orderDeliveryInfo = { //배송주소
        orderId : '',
        roadAddress : '',
        zipcodeAddress : '',
        remainAddress : '',
        receiverName : '', //주문고객
        message : '',
        contactNumber : '',
        phoneNumber : '',
    };
    orderPaymentInfo = {
        originalPrice : 0, //밑에 3개안넣기
        discountPrice : 0,
        paymentPrice : 0,
        orderOriginalPrice : { 
            orderId : '', //비워놓기
            goodsPrice : '', //originalPrice
            shippingPrice : '', //제품 각각 배송비
        },
        //list임
        orderDiscountPriceList : [{
            orderId : '',
            discountName : '',
            discountPrice : '', 
        }],
        orderCardPaymentInfo : {
            orderId : '',
            cardName : '', //카드이름
            installments : '', //스트링값
        },
    };
    orderPointInfo = {
        orderId : '',
        orderComplete : '', //주문 완료되면 적립되는 포인트
        writeComplete : '', //상품평 작성되면 적립되는 포인트 (200으로 넣기)
    };
    

    constructor(orderId, userId, goodsId, goodsCount, orderPrice, orderDate, orderState, selectedOptions){
        this.orderId = orderId; // ''
        this.userId = userId; //'testid'
        this.goodsId = goodsId; // 
        this.goodsCount = goodsCount;// 1
        this.orderPrice = orderPrice; //''
        this.orderDate = orderDate; //2020-03-02
        this.selectedOptions = selectedOptions; //사이즈 : 235, 색깔 : 흰색 
        this.orderState = orderState; // null
    }
}

export default OrderModel;