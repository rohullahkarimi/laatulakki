//import React from 'react';
import React from 'react'; // Make sure you have this import
import '../../common/css/style.css';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {  saveCustomerInformation } from '../../redux/cartRedux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const BillingAddressForm = ({navigation}) => {
  const { t } = useTranslation();
  //console.log(navigation)
  const [deliveryAddressFormEnable, setDeliveryAddressFormEnable ] = useState(false)
 
  const cart = useSelector((state) => state.cart);
  const [deliverySameAsBillingCheckbox, setDeliverySameAsBillingCheckbox ] = useState(cart.deliverySameAsBilling)
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors: customerInfoErrors } } = useForm();


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

 


  const handleCustomerInformationSubmit = (data) => {
    console.log(data)
    dispatch(saveCustomerInformation(data));
    navigation.next()
  }
  //console.log(customerInfoErrors)
  //console.log(cart)

  useEffect(() => {
    let defaultValues = {};
    // billingAddress
    defaultValues.firstName = cart.billingAddress.firstname;
    defaultValues.lastName = cart.billingAddress.lastname;
    defaultValues.streetAddress = cart.billingAddress.streetAddress;
    defaultValues.postalCode = cart.billingAddress.postalCode;
    defaultValues.city = cart.billingAddress.city;
    defaultValues.country = cart.billingAddress.country ? cart.billingAddress.country : "FI"
    defaultValues.phonenumber = cart.billingAddress.phonenumber;
    defaultValues.email = cart.billingAddress.email;
    defaultValues.comment = cart.message;

    // deliverySameAsBilling
    if(cart.deliverySameAsBilling){
      setDeliverySameAsBillingCheckbox(cart.deliverySameAsBilling)
      setDeliveryAddressFormEnable(false);
    }else{
      setDeliveryAddressFormEnable(true);
    }
    
    // deliveryAddress
    defaultValues.deliveryAddress_firstName = cart.deliveryAddress.firstname;
    defaultValues.deliveryAddress_lastName = cart.deliveryAddress.lastname;
    defaultValues.deliveryAddress_streetAddress = cart.deliveryAddress.streetAddress;
    defaultValues.deliveryAddress_postalCode = cart.deliveryAddress.postalCode;
    defaultValues.deliveryAddress_city = cart.deliveryAddress.city;
    defaultValues.deliveryAddress_country = cart.deliveryAddress.country ? cart.deliveryAddress.country : "FI";
    defaultValues.deliveryAddress_phonenumber = cart.deliveryAddress.phonenumber;
    defaultValues.deliveryAddress_email = cart.deliveryAddress.email;


    reset({ ...defaultValues });
  }, [cart, reset]);

  
  const checkboxHandler = (e) => {
    //console.log(e)
    if (e.target.type === 'checkbox' && !e.target.checked) {
      setDeliveryAddressFormEnable(false);
    } else {
      setDeliveryAddressFormEnable(true);
    }
  }

  const DeliveryAddress = () => (
    <>
      <header className="header mt5">
        <h2 className="heading">{t('receiverInfo')}</h2>
      </header>

      <fieldset id="fs">
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_firstName" data-optional="(Optional)">{t("firstname")}</label>
          <input type="text" name="deliveryAddress_firstName"  id="deliveryAddress_firstName" className={customerInfoErrors.deliveryAddress_firstName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_firstName",{ required: true })}/>
          <span id="customerInformation_lastname" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_firstName && customerInfoErrors.deliveryAddress_firstName?.type === "required" && (
            t('firstname')+' '+t('mandatory')
          )}
          </span>
        </div>
          
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_lastName" data-optional="(Optional)">{t("lastname")}</label>
          <input type="text" name="deliveryAddress_lastName"  id="deliveryAddress_lastName" className={customerInfoErrors.deliveryAddress_lastName ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_lastName",{ required: true })}/>
          <span id="customerInformation_deliveryAddress_lastName" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_lastName && customerInfoErrors.deliveryAddress_lastName?.type === "required" && (
            t('lastname')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_streetAddress" data-optional="(Optional)">{t("streetAddress")}</label>
          <input type="text" name="deliveryAddress_streetAddress"  id="deliveryAddress_streetAddress" className={customerInfoErrors.deliveryAddress_streetAddress ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_streetAddress",{ required: true })}/>
          <span id="customerInformation_deliveryAddress_streetAddress" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_streetAddress && customerInfoErrors.deliveryAddress_streetAddress?.type === "required" && (
            t('streetAddress')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_postalCode" data-optional="(Optional)">{t("postalCode")}</label>
          <input type="text" name="deliveryAddress_postalCode"  id="deliveryAddress_postalCode" className={customerInfoErrors.deliveryAddress_postalCode ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_postalCode",{ required: true })}/>
          <span id="customerInformation_deliveryAddress_postalCode" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_postalCode && customerInfoErrors.deliveryAddress_postalCode?.type === "required" && (
            t('postalCode')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_city" data-optional="(Optional)">{t("city")}</label>
          <input type="text" name="deliveryAddress_city"  id="deliveryAddress_city" className={customerInfoErrors.deliveryAddress_city ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_city",{ required: true })}/>
          <span id="customerInformation_deliveryAddress_city" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_city && customerInfoErrors.deliveryAddress_city?.type === "required" && (
            t('city')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        <div className="inputwrapper required">
        <label className="label" htmlFor="country" data-optional="(Optional)">{t("country")}</label>
          <select name="deliveryAddress_country" defaultValue="FI" id="deliveryAddress_country" className={customerInfoErrors.country ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_country",{ required: true })}>
            <option value="">Valitse</option>
            <option value="AF">Afghanistan</option><option value="AX">Åland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia, Plurinational State of</option><option value="BQ">Bonaire, Sint Eustatius and Saba</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo, the Democratic Republic of the</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CI">Côte d'Ivoire</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and McDonald Islands</option><option value="VA">Holy See (Vatican City State)</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran, Islamic Republic of</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KP">Korea, Democratic People's Republic of</option><option value="KR">Korea, Republic of</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao People's Democratic Republic</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia, the former Yugoslav Republic of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia, Federated States of</option><option value="MD">Moldova, Republic of</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territory, Occupied</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Réunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthélemy</option><option value="SH">Saint Helena, Ascension and Tristan da Cunha</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin (French part)</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SX">Sint Maarten (Dutch part)</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="SS">South Sudan</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="FI">Suomi - Finland</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syrian Arab Republic</option><option value="TW">Taiwan, Province of China</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania, United Republic of</option><option value="TH">Thailand</option><option value="TL">Timor-Leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VE">Venezuela, Bolivarian Republic of</option><option value="VN">Viet Nam</option><option value="VG">Virgin Islands, British</option><option value="VI">Virgin Islands, U.S.</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>
          </select>
          <span id="customerInformation_deliveryAddress_country" className='input-info invalid' role="alert">
            {customerInfoErrors.deliveryAddress_country && customerInfoErrors.deliveryAddress_country?.type === "required" && (
            t('country')+' '+t('mandatory')
            )}
            </span>
        </div>
  
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_phonenumber" data-optional="(Optional)">{t("phonenumber")}</label>
          <input type="text" name="deliveryAddress_phonenumber"  id="deliveryAddress_phonenumber" className={customerInfoErrors.deliveryAddress_phonenumber ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_phonenumber",{ required: true })}/>
          <span id="customerInformation_deliveryAddress_phonenumber" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_phonenumber && customerInfoErrors.deliveryAddress_phonenumber?.type === "required" && (
            t('phonenumber')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        <div className="inputwrapper required">
          <label className="label" htmlFor="deliveryAddress_email" data-optional="(Optional)">{t("email")}</label>
          <input type="email" name="deliveryAddress_email"  id="deliveryAddress_email" className={customerInfoErrors.deliveryAddress_email ? 'invalid form_input' : 'form_input'}  {...register("deliveryAddress_email",{ 
            required: true
            
            })}/>
          <span id="customerInformation_deliveryAddress_email" className='input-info invalid' role="alert">
          {customerInfoErrors.deliveryAddress_email && customerInfoErrors.deliveryAddress_email?.type === "required" && (
            t('email')+' '+t('mandatory')
          )}
          </span>
        </div>
  
        </fieldset>
    </>
  )
  
  return (
    <div className='container'>
      <div className="customer_information_form">
        <form id="customerInformation" name="customerInformation" onSubmit={handleSubmit(handleCustomerInformationSubmit)}>
          
          <header className="header">
            <h2 className="heading">{t('ordererInfo')}</h2>
            <p>{t('orderer_desc')}</p>
          </header>


          <div className="inputwrapper required">
            <label className="label" htmlFor="firstname" >{t("firstname")}</label>
            <input type="text" name="firstName"  id="firstname" className={customerInfoErrors.firstName ? 'invalid form_input' : 'form_input'}   {...register("firstName",{ required: true })}/>
            <span id="customerInformation_firstname" className='input-info invalid' role="alert">
            {customerInfoErrors.firstName && customerInfoErrors.firstName?.type === "required" && (
              t('firstname')+' '+t('mandatory')
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="lastName" >{t("lastname")}</label>
            <input type="text" name="lastName"  id="lastName" className={customerInfoErrors.lastName ? 'invalid form_input' : 'form_input'}  {...register("lastName",{ required: true })}/>
            <span id="customerInformation_lastname" className='input-info invalid' role="alert">
            {customerInfoErrors.lastName && customerInfoErrors.lastName?.type === "required" && (
              t('lastname')+' '+t("mandatory")
            )}
            </span>
          </div>

        
          <div className="inputwrapper required">
            <label className="label" htmlFor="streetAddress" data-optional="(Optional)">{t("streetAddress")}</label>
            <input type="text" name="streetAddress"  id="streetAddress" className={customerInfoErrors.streetAddress ? 'invalid form_input' : 'form_input'}  {...register("streetAddress",{ required: true })}/>
            <span id="customerInformation_streetAddress" className='input-info invalid' role="alert">
            {customerInfoErrors.streetAddress && customerInfoErrors.streetAddress?.type === "required" && (
              t('streetAddress')+' '+t("mandatory")
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="postalCode" data-optional="(Optional)">{t("postalCode")}</label>
            <input type="text" name="postalCode"  id="postalCode" className={customerInfoErrors.postalCode ? 'invalid form_input' : 'form_input'}  {...register("postalCode",{ required: true })}/>
            <span id="customerInformation_postalCode" className='input-info invalid' role="alert">
            {customerInfoErrors.postalCode && customerInfoErrors.postalCode?.type === "required" && (
              t('postalCode')+' '+t("mandatory")
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="city" data-optional="(Optional)">{t("city")}</label>
            <input type="text" name="city"  id="city" className={customerInfoErrors.city ? 'invalid form_input' : 'form_input'}  {...register("city",{ required: true })}/>
            <span id="customerInformation_city" className='input-info invalid' role="alert">
            {customerInfoErrors.city && customerInfoErrors.city?.type === "required" && (
              t('city')+' '+t("mandatory")
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="country" data-optional="(Optional)">{t("country")}</label>
            <select name="country" defaultValue="FI" id="country" className={customerInfoErrors.country ? 'invalid form_input' : 'form_input'}  {...register("country",{ required: true })}>
              <option value="">Valitse</option>
              <option value="AF">Afghanistan</option><option value="AX">Åland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia, Plurinational State of</option><option value="BQ">Bonaire, Sint Eustatius and Saba</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo, the Democratic Republic of the</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CI">Côte d'Ivoire</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and McDonald Islands</option><option value="VA">Holy See (Vatican City State)</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran, Islamic Republic of</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KP">Korea, Democratic People's Republic of</option><option value="KR">Korea, Republic of</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao People's Democratic Republic</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia, the former Yugoslav Republic of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia, Federated States of</option><option value="MD">Moldova, Republic of</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territory, Occupied</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Réunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthélemy</option><option value="SH">Saint Helena, Ascension and Tristan da Cunha</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin (French part)</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SX">Sint Maarten (Dutch part)</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="SS">South Sudan</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="FI">Suomi - Finland</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syrian Arab Republic</option><option value="TW">Taiwan, Province of China</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania, United Republic of</option><option value="TH">Thailand</option><option value="TL">Timor-Leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VE">Venezuela, Bolivarian Republic of</option><option value="VN">Viet Nam</option><option value="VG">Virgin Islands, British</option><option value="VI">Virgin Islands, U.S.</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option>
            </select>
            <span id="customerInformation_country" className='input-info invalid' role="alert">
              {customerInfoErrors.country && customerInfoErrors.country?.type === "required" && (
                t('country')+' '+t("mandatory")
              )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="phonenumber" data-optional="(Optional)">{t("phonenumber")}</label>
            <input type="text" name="phonenumber"  id="phonenumber" className={customerInfoErrors.phonenumber ? 'invalid form_input' : 'form_input'}  {...register("phonenumber",{ required: true })}/>
            <span id="customerInformation_phonenumber" className='input-info invalid' role="alert">
            {customerInfoErrors.phonenumber && customerInfoErrors.phonenumber?.type === "required" && (
              t('phonenumber')+' '+t("mandatory")
            )}
            </span>
          </div>

          <div className="inputwrapper required">
            <label className="label" htmlFor="email" data-optional="(Optional)">{t("email")}</label>
            <input type="email" name="email"  id="email" className={customerInfoErrors.email ? 'invalid form_input' : 'form_input'}  {...register("email",{ 
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              }
            })}/>
            <span id="customerInformation_email" className='input-info invalid' role="alert">
            {customerInfoErrors.email && customerInfoErrors.email?.type === "required" && (
              t('email')+' '+t("mandatory")
            )}
            {customerInfoErrors.email?.message  && (
              t('invalidEmail')
            )}
            </span>
          </div>


          <div className="inputwrapper">
            <label className="label" htmlFor="comment" data-optional="(Optional)">{t('order_extra_info')}</label>
            <textarea type="text" name="comment"  id="comment" className={customerInfoErrors.comment ? 'invalid form_input' : 'form_input'}  {...register("comment",{ required: false })}/>
            <span id="customerInformation_comment" className='input-info invalid' role="alert">
            {customerInfoErrors.comment && customerInfoErrors.comment?.type === "required" && (
              t('order_extra_info')+' '+t("mandatory")
            )}
            </span>
          </div>

       


          <div className="inputwrapper">
            <input type="checkbox" defaultChecked={deliverySameAsBillingCheckbox ? false : true} className="checkbox-input checkbox-larger" id="deliverySameAsBilling" name="deliverySameAsBilling" 
            {...register("deliverySameAsBilling",{ 
              required: false,
              onChange: checkboxHandler,
            })}
            />
            <label htmlFor="deliverySameAsBilling" className="checkbox-label checkbox-label-larger">
            {t('deliveryToDifferentPlace')}
            </label>
	        </div>

          { deliveryAddressFormEnable ? <DeliveryAddress /> : null }
        
        </form>
      </div>

    </div>
  );
};



export default BillingAddressForm;
