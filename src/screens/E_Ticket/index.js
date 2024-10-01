import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import TopBar from '../../components/TopBar';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {MyText} from '../../assets/Fonts';
import {Colors} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/Buttton';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const E_Ticket = ({navigation, route}) => {
  const data = route.params.data;
  const orderId = Date.now().toString();
  const createPDF = async () => {
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
<p>${data.data.item.hName}</p>
<p class="heading">Date and Hour</p>
<p>${data.data.item.dateToSend}</p>
<p class="heading">Venue Locations</p>
<p>${data.data.item.hLocation}</p>
<p class="heading">Venue Manager</p>
<p>${data.data.item.hManager} Name</p>
</div>
<div class="view">
<div class="inner">
<p class="heading">Full Name</p>
<p>${data.data.item.firstName} ${data.data.item.lastName}</p>
</div>
<div class="inner">
<p class="heading">NickName</p>
<p>${data.data.item.userName}</p>
</div>
<div class="inner">
<p class="heading">Gender</p>
<p>${data.data.item.gender}</p>
</div>
<div class="inner">
<p class="heading">Date Of Birth</p>
<p>12/09/2001</p>
</div>
<div class="inner">
<p class="heading">City</p>
<p>${data.data.item.city}</p>
</div>
<div class="inner">
<p class="heading">Phone</p>
<p>${data.data.item.contact}</p>
</div>
<div class="inner">
<p class="heading">Email</p>
<p>${data.data.item.mail}</p>
</div>
</div>
<div class="view">
<div class="inner">
<p class="heading">${data.data.item.seats} seats (${
        data.data.item.category
      })</p>
<p>RS ${data.data.item.price}/-</p>
</div>
<div class="inner">
<p class="heading">Tax</p>
<p>RS 500/-</p>
</div>
<p class="tiny primary">MoreOver, price can be discussed with Owner chat</p>
<div class="line"></div>
<div class="inner">
<p class="heading">Total</p>
<p>RS ${data.data.item.price + 500}/-</p>
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
      fileName: `E-Ticket for ${data.data.item.hName}`,
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
  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar title={'E-Ticket'} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Barcode
          value={Date.now().toString()}
          height={80}
          format="CODE128"
          width={2}
          lineColor="black"
          text={Date.now().toString()}
          style={styles.barCode}
        />
        <View style={styles.view}>
          <MyText title={'Venue'} />
          <MyText title={data.data.item.hName} heading />
          <MyText title={'Date and Hour'} />
          <MyText title={data.data.item.dateToSend} heading />
          <MyText title={'Venue Locations'} />
          <MyText title={data.data.item.hLocation} heading />
          <MyText title={'Venue Manager'} />
          <MyText title={`${data.data.item.hManager} Name`} heading />
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Full Name'} style={{color: 'grey'}} />
            <MyText
              title={`${data.data.item.firstName} ${data.data.item.lastName}`}
            />
          </View>
          <View style={styles.inner}>
            <MyText title={'NickName'} style={{color: 'grey'}} />
            <MyText title={data.data.item.userName} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Gender'} style={{color: 'grey'}} />
            <MyText title={data.data.item.gender} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Date Of Birth'} style={{color: 'grey'}} />
            <MyText title={'12/09/2001'} />
          </View>
          <View style={styles.inner}>
            <MyText title={'City'} style={{color: 'grey'}} />
            <MyText title={data.data.item.city} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Phone'} style={{color: 'grey'}} />
            <MyText title={data.data.item.contact} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Email'} style={{color: 'grey'}} />
            <MyText title={data.data.item.mail} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText
              title={`${data.data.item.seats} seats (${data.data.item.category})`}
              style={{color: 'grey'}}
            />
            <MyText title={`RS ${data.data.item.price}/-`} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Tax'} style={{color: 'grey'}} />
            <MyText title={'RS 500/-'} />
          </View>
          <MyText
            title={'MoreOver, price can be disgussed with Owner chat'}
            tiny
            style={{color: Colors.primary, textAlign: 'center'}}
          />
          <View style={styles.line} />
          <View style={styles.inner}>
            <MyText title={'Total'} style={{color: 'grey'}} />
            <MyText title={`RS ${data.data.item.price + 500}/-`} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Paymentt Methods'} style={{color: 'grey'}} />
            <MyText title={'MasterCard'} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Order ID'} style={{color: 'grey'}} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MyText title={orderId} />
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(orderId);
                  Toast.show({
                    type: 'info',
                    text1: 'Coppied',
                    position: 'bottom',
                    visibilityTime: 500,
                  });
                }}>
                <Feather name="copy" size={15} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inner}>
            <MyText title={'Status'} style={{color: 'grey'}} />
            <View style={styles.status}>
              <MyText
                title={'paid'}
                style={{
                  color: Colors.primary,
                }}
                tiny
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="Download E-Ticket"
        width="100%"
        marginVertical={10}
        txtSize={20}
        onClick={createPDF}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  barCode: {
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  view: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    gap: 13,
    justifyContent: 'space-between',
    // ...elevation,
  },
  inner: {flexDirection: 'row', justifyContent: 'space-between'},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
  status: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 7,
    borderStyle: 'dashed',
  },
});
export default E_Ticket;
