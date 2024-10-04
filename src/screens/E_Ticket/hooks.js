import React from 'react';
import {useDispatch} from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {removeCurrentBooking} from '../../Features/dataSlice';
import Toast from 'react-native-toast-message';

const orderId = Date.now().toString();
const dispatch = useDispatch();
export const createPDF = async (navigation, data) => {
  let options = {
    html: `
          <html>
<head>
<title>E-Tickets</title>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
<script>
function textToBase64Barcode(text) {
var canvas = document.createElement("canvas");
JsBarcode(canvas, text, { format: "CODE39" });
return canvas.toDataURL("image/png");
}

function generateBarcode() {
var barcodeImage = textToBase64Barcode(${orderId});
document.getElementById("barcode").src = barcodeImage;
}

window.onload = generateBarcode;
</script>
<style>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
  .title {
 text-align: center;
  }
.view {
  margin: 10px 0;
}
.inner {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.barCode {
display: flex;
justify-content: center;
align-items: center;
  margin-bottom: 20px;
  
}
.line {
  height: 1px;
  background-color: grey;
  margin: 10px 0;
}
.status {
  background-color: lightgrey;
  padding: 5px;
  border-radius: 5px;
}
.heading {
  font-weight: bold;
}
.tiny {
  font-size: 12px;
}
.primary {
  color: #007bff;
}
</style>
</head>
<body>
<h1 class="title">E-Ticket</h1>
<div class="barCode">
<img id="barcode" alt="Barcode">
</div>
<div class="view">
<p class="heading">Venue</p>
<p>${data[0]?.name}</p>
<p class="heading">Date and Hour</p>
<p>${data[2]?.dateToSend}</p>
<p class="heading">Venue Locations</p>
<p>${data[0]?.location}</p>
<p class="heading">Venue Manager</p>
<p>${data[0]?.managerName} Name</p>
</div>
<div class="view">
<div class="inner">
<p class="heading">Full Name</p>
<p>${data[2]?.firstName} ${data[2]?.lastName}</p>
</div>
<div class="inner">
<p class="heading">NickName</p>
<p>${data[2]?.userName}</p>
</div>
<div class="inner">
<p class="heading">Gender</p>
<p>${data[2]?.gender}</p>
</div>
<div class="inner">
<p class="heading">Date Of Birth</p>
<p>12/09/2001</p>
</div>
<div class="inner">
<p class="heading">City</p>
<p>${data[2]?.city}</p>
</div>
<div class="inner">
<p class="heading">Phone</p>
<p>${data[2]?.contact}</p>
</div>
<div class="inner">
<p class="heading">Email</p>
<p>${data[2]?.mail}</p>
</div>
</div>
<div class="view">
<div class="inner">
<p class="heading">${data[1]?.seats} seats (${data[1]?.category})</p>
<p>RS ${data[1]?.price}/-</p>
</div>
<div class="inner">
<p class="heading">Tax</p>
<p>RS 500/-</p>
</div>
<p class="tiny primary">MoreOver, price can be discussed with Owner chat</p>
<div class="line"></div>
<div class="inner">
<p class="heading">Total</p>
<p>RS ${data[1]?.price + 500}/-</p>
</div>
</div>
<div class="view">
<div class="inner">
<p class="heading">Payment Methods</p>
<p>MasterCard</p>
</div>
<div class="inner">
<p class="heading">Order ID</p>
<p>${orderId}</p>
</div>
<div class="inner">
<p class="heading">Status</p>
<div class="status">
<p class="tiny primary">paid</p>
</div>
</div>
</div>
</body>
</html>
      `,
    fileName: `E-Ticket for ${data[0]?.name}`,
    directory: 'Downloads',
  };
  let file = await RNHTMLtoPDF.convert(options);
  Toast.show({
    type: 'success',
    text1: 'Open Your Ticket here!',
    text2: file.filePath,
    visibilityTime: 8000,
    swipeable: true,
  });
  console.log(file.filePath);

  dispatch(removeCurrentBooking());
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'HomeTab',
        state: {
          routes: [
            {
              name: 'Booking',
            },
          ],
        },
      },
    ],
  });
};
