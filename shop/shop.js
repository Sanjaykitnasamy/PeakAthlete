
    var nameBillArray = [];
    var quantityBillArray = [];
    var priceBillArray = [];

    var totalPriceBillArray = [];
    //The names of the products and names of the images 
    var nameProductArray = [
        ["| Armor ACG React Terra |", "shoe_01"],
        ["| Armor Air Zoom Alpha |", "shoe_02"],
        ["| PEAK Tier Wristband |", "Wristband"],
        ["| Athlete Hoodie Black |", "hoodie_BL"],
        ["| Armor Air Alpha |", "shoe_03"],
        ["| Peak Hoodie Neon Green |", "hoodie_Gr"]
    ]
    //The textFontSize IDs
    var quantityIdArray = ["Textfontsize_0", "Textfontsize_1", "Textfontsize_2", "Textfontsize_3", "Textfontsize_4", "Textfontsize_5"]
    //The id's of the product's picture
    var idArray = ["shoe_01", "shoe_02", "Wristband", "hoodie_BL", "shoe_03", "hoodie_Gr"];
 


    
    if (nameBillArray.length === 0) {
        console.log("hii")
        document.getElementById("Form2").style.display = "none";
        document.getElementById("ContinueToCheckOut1").style.display = "none";
        document.getElementById("Product_Table").style.display = "none";
    }


    function cartIncrease(cartValue) {
        var currentQuantity = document.getElementById(quantityIdArray[cartValue]).innerHTML;
     
        currentQuantity = parseInt(currentQuantity);
        
        if (currentQuantity < 5) {
            currentQuantity++;
            document.getElementById(quantityIdArray[cartValue]).innerHTML = currentQuantity;
        } else {
            alert("Maximum Quantity Reached")
        }
    }

  
    function cartDecrease(cartValue) {
        var currentQuantity = document.getElementById(quantityIdArray[cartValue]).innerHTML;
        currentQuantity = parseInt(currentQuantity);
        
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById(quantityIdArray[cartValue]).innerHTML = currentQuantity;
        } else {
            alert("Minimum Quantity Reached")
        }
    }
    //Calculate the total
    function calcFinalAmt() {
        var finalAmount = 0;
        for (var index = 0; index < totalPriceBillArray.length; index++) {
            finalAmount += totalPriceBillArray[index];
        }
        document.getElementById("total").innerHTML = finalAmount;
    }
    //Add the items to the cart
    function addtoCart(val) {
        //All the prices of products
        var priceArray = [3000.00,4500.00,40.00,600.00,3700.00,500.00];

        var quantity = document.getElementById(quantityIdArray[val]).innerHTML;
        console.log("quantity :", quantity)

        var imageSource = document.getElementById(idArray[val]).src;
        var priceItem1 = priceArray[val];
        var res = imageSource.split(".jpeg");
        var res1 = res[0].split("/");
        var nameImage = res1[res1.length - 1];
        var nameItem1 = "";


        for (var index = 0; index < nameProductArray.length; index++) {
            if (idArray[val] == nameProductArray[index][1]) {
                nameItem1 = nameProductArray[index][0];
                break;
            }
        }

        console.log({ nameImage, imageSource , nameItem1} )

        var found = false;
       
        for (var index2 = 0; index2 < nameBillArray.length; index2++) {
            if (nameBillArray[index2] === nameItem1) {
                found = true;
                quantity = parseInt(quantity);
                quantityBillArray[index] = parseInt(quantityBillArray[index]);
                var rowChangeCell = document.getElementById("Product_Table").rows[index2 + 1].cells;
                quantityBillArray[index2] = quantity;
                rowChangeCell[1].innerHTML = quantityBillArray[index2];
                var priceChange = rowChangeCell[2].innerHTML;
                var total = quantityBillArray[index2] * priceChange;
                rowChangeCell[3].innerHTML = total;
                totalPriceBillArray[index2] = total;
                calcFinalAmt();
            }
            break;
        }
        
        if (!found) {
            quantity = parseInt(quantity);
            var totalPrice = quantity * priceItem1;
           
            nameBillArray.push(nameItem1);
            priceBillArray.push(priceItem1);
            quantityBillArray.push(quantity);
            totalPriceBillArray.push(totalPrice);
            var table = document.getElementById("Product_Table");
            var itemRow = table.insertRow(nameBillArray.length);
            itemRow.id = "index" + nameBillArray.length;
            var nameCell = itemRow.insertCell(0);
            var quantityCell = itemRow.insertCell(1);
            var priceCell = itemRow.insertCell(2);
            var totalpriceCell = itemRow.insertCell(3);
            var crossCell = itemRow.insertCell(4);
            nameCell.innerHTML = nameItem1;
            quantityCell.innerHTML = quantity;
            priceCell.innerHTML = priceItem1;
            totalpriceCell.innerHTML = totalPrice;
            //Inorder to delete the item from the shopping cart,the crosscell has the onclick function 
            crossCell.innerHTML = '<img src="images/delete icon.jpeg" height="18px" width="18px"/>';
            crossCell.id = "cross" + nameBillArray.length;
            crossCell.title = "Click to remove item from your Cart";
            calcFinalAmt();
            if (nameBillArray.length === 1) {
                document.getElementById("Product_Table").style.display = "block";
                document.getElementById("ContinueToCheckOut1").style.display = "block";
            }
            //To delete an item from the cart using the below code in the function
            document.getElementById(crossCell.id).addEventListener("click", function () {
                deleteRow(itemRow.id);
            });
        }

    }


   
    function deleteRow(itemRowId) {
        var row = document.getElementById(itemRowId);
        
        var indexArray = row.rowIndex - 1;
       
        nameBillArray.splice(indexArray, 1);
        priceBillArray.splice(indexArray, 1);
        quantityBillArray.splice(indexArray, 1);
        totalPriceBillArray.splice(indexArray, 1);
        
        row.parentNode.removeChild(row);
        var finalAmount = 0;
        calcFinalAmt();
    
        if (nameBillArray.length === 0) {
            document.getElementById("Form2").style.display = "none";
            document.getElementById("ContinueToCheckOut1").style.display = "none";
            document.getElementById("Product_Table").style.display = "none";
        }

    }

    //To show the form when the customer clicks the proceed button 
    function showForm() {
        document.getElementById("Form2").style.display = "block";
        document.getElementById("ContinueToCheckOut1").style.visibility = "hidden"
    }


    function payByCard() {
        document.getElementById("PayByAnyCard").style.display = "block";
    }

 
    function payByCash() {
        document.getElementById("PayByAnyCard").style.display = "none";
    }

   
    function validateCard() {
        var creditValid = true;
        
        var enteredFName = document.getElementById("fname").value;
        var enteredLName = document.getElementById("lname").value;
        var enteredEmail = document.getElementById("email").value;
        var enteredTelNo = document.getElementById("telephone").value;
        var enteredStreet = document.getElementById("street1").value;
        var enteredCity = document.getElementById("city").value;
        var enteredCountry = document.getElementById("country").value;
        
        var atSymIndex = enteredEmail.indexOf("@");
        var dotSymIndex = enteredEmail.lastIndexOf(".");
        
        if (enteredFName.length <= 0) {
            alert("Enter First Name");
            creditValid = false;
        } else if (enteredLName.length <= 0) {
            alert("Enter last Name");
            creditValid = false;
        } else if (atSymIndex == 0 || dotSymIndex < atSymIndex + 2 || dotSymIndex + 2 >= enteredEmail.length) {
            alert("Enter correct Email");
            creditValid = false;
            
        } else if (isNaN(enteredTelNo)) {
            alert("Enter only integers for the Telephone Number.");
            creditValid = false;
           
        } else if (enteredTelNo.length > 15 || enteredTelNo.length < 7) {
            alert("Enter correct Telephone Number");
            creditValid = false;
           
        } else if (enteredStreet.length < 1) {
            alert("Enter correct Street");
            creditValid = false;
        } else if (enteredCity.length < 1) {
            alert("Enter Correct City Name");
            creditValid = false;
        } else if (enteredCountry.value == "") {
            alert("Select a country");
            creditValid = false;
           
        } else if (document.getElementById("PaymentMethod1").checked) {
            var cvcNumber = document.getElementById("cvcNumber").value;
            var cardNumber = document.getElementById("cardNumber").value;
            cardNumber = cardNumber.split(" ").join('');
            //This is used to check if the entered card is expired 
            var d = new Date();
            var currentMonth = d.getMonth() + 1;
            var currentYear = d.getFullYear();
            var enteredDate = document.getElementById("myDate").value;
            var enteredDate1 = enteredDate.split("-")
            if (!((enteredDate1[0] >= currentYear) && (enteredDate1[1] > (currentMonth + 2)))) {
                alert("Card expired! Enter a different Card.");
                creditValid = false;
            } else if (cardNumber.length != 16) {
                alert("Enter the valid card number.");
                creditValid = false;
            } else if (cvcNumber.length != 3) {
                alert("Enter the valid card number! CVC is Invalid");
                creditValid = false;
                
            } else if (isNaN(cardNumber)) {
                alert("Enter only integers for the card number")
                creditValid = false;
            } else if (isNaN(cvcNumber)) {
                alert("Enter only integers for the cvc number")
                creditValid = false;
            }
            
        } else if (!(document.getElementById("PaymentMethod2").checked)) {
            alert("Select a payment Method");
            creditValid = false;
        }
        
        if (creditValid) {
            var message = "Dear ";
            message += enteredFName;
            message += " you have ordered "
            for (var indexConfirm = 0; indexConfirm < nameBillArray.length; indexConfirm++) {
                message += quantityBillArray[indexConfirm] + " No(s) ";
                message += nameBillArray[indexConfirm];
              
                message = message + " at a cost of " + "£" + totalPriceBillArray[indexConfirm];
                if (indexConfirm == nameBillArray.length - 2) {
                    message += " and "
                } else if (indexConfirm == nameBillArray.length - 1) {
                    message += ". "
                } else {
                    message += ", "
                }
            }
            var finalAmount = document.getElementById("total").innerHTML;
            message += "\n\nThe total amount you have to pay is £" + finalAmount;
            message += "\nPress OK to confirm order or Cancel to Continue shopping";
           
            if (confirm(message)) {
                alert("Thank You for purchasing at PEAK Shop. Have a nice day :).")
                location.reload();

            }
        }
    }
    function scrollDown() {
        if (document.documentElement.scrollTop > 250) {
            document.getElementById("scrollButton").style.display = "block";
        } else {
            document.getElementById("scrollButton").style.display = "none";
        }
    }
