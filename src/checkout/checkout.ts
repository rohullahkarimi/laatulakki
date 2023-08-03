import * as crypto from 'crypto'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { SignLanguage } from '@mui/icons-material'

const CHECKOUT_ENDPOINT = 'https://services.paytrail.com' //'https://api.checkout.fi'

type Dictionary<T> = { [key: string]: T }

export interface CheckoutItem {
	/** Price per unit, VAT included, in each country's minor unit, e.g. for Euros use cents */
	unitPrice: number
	/** Quantity, how many items ordered */
	units: number
	/** VAT percentage */
	vatPercentage: number
	/** Merchant product code. May appear on invoices of certain payment methods. */
	productCode: string
	/** When is this item going to be delivered */
	deliveryDate: string
	/** Item description. May appear on invoices of certain payment methods. */
	description?: string
	/** Merchant specific item category */
	category?: string
	/** Unique identifier for this item. Required for Shop-in-Shop payments. */
	stamp?: string
	/** Reference for this item. Required for Shop-in-Shop payments. */
	reference?: string
	/** Merchant ID for the item. Required for Shop-in-Shop payments, do not use for normal payments. */
	merchant?: string
	/** Shop-in-Shop commission. Do not use for normal payments. */
	commission?: CheckoutComission
}

export interface CheckoutComission {
	/** Merchant who gets the commission */
	merchant: string
	/** Amount of commission in currency's minor units, eg. for Euros use cents. VAT not applicable. */
	amount: number
}

export interface CheckoutCustomer {
	/** Email */
	email: string
	/** First name */
	firstName?: string
	/** Last name */
	lastName?: string
	/** Phone number */
	phoneNumber?: string
	/** VAT ID, if any */
	vatId?: string
}

export interface CheckoutAddress {
	/** Street address */
	streetAddress: string
	/** Postal code */
	postalCode: string
	/** City */
	city: string
	/** County/State */
	county: string
	/** Alpha-2 country code */
	country: string
}

export interface CheckoutCallback {
	/** Called on successful payment */
	success: string
	/** Called on cancelled payment */
	cancel: string
}

export interface CheckoutPaymentOptions {
	/** Merchant unique identifier for the order */
	stamp: string
	/** Order reference */
	reference: string
	/**
	 * Total amount of the payment in currency's minor units, eg. for Euros use cents.
	 * Must match the total sum of items.
	 */
	amount: number
	/** Currency, only EUR supported at the moment */
	currency: 'EUR'
	/** Payment's language, currently supported are FI, SV, and EN */
	language: 'FI' | 'SV' | 'EN'
	/** Array of items */
	items: CheckoutItem[]
	/** Cusomer information */
	customer: CheckoutCustomer
	/** Delivery address */
	deliveryAddress?: CheckoutAddress
	/** Invoicing address */
	invoicingAddress?: CheckoutAddress
	/** Where to redirect browser after a payment is paid or cancelled */
	redirectUrls: CheckoutCallback
	/** Which url to ping after this payment is paid or cancelled */
	callbackUrls?: CheckoutCallback
}

export interface CheckoutPayment {
	transactionId: string
	href: string
	/** Available payment methods. */
	providers: CheckoutProvider[]
}

export interface CheckoutProvider {
	url: string
	icon: string
	svg: string
	name: string
	group: string
	id: string
	parameters: CheckoutProviderParameter[]
}

export interface CheckoutProviderParameter {
	name: string
	value: string
}

// Helper type https://stackoverflow.com/a/45257357
const Tuple = <T extends string[]>(...args: T) => args

// List of hashing algoritms supported by checkout.
const SupportedAlgorithms = Tuple('sha256', 'sha512')

export type CheckoutAlgorithm = typeof SupportedAlgorithms[number]

export function isSupportedAlgorithm(algorithm: string): algorithm is CheckoutAlgorithm {
	return SupportedAlgorithms.includes(algorithm as CheckoutAlgorithm)
}

export default class CheckoutApi {
	private readonly merchantId: string
	private readonly secret: string
	algorithm: CheckoutAlgorithm

	constructor(merchantId: string, secret: string, algorithm: CheckoutAlgorithm = 'sha512') {
		this.merchantId = merchantId
		this.secret = secret

		if (!isSupportedAlgorithm(algorithm)) {
			throw new Error(`${algorithm} is not supported signature algorithm`)
		}

		this.algorithm = algorithm
	}

	static calcMac(secret: string, algorithm: CheckoutAlgorithm, params: Dictionary<string>, body?: string, test?: string): string {
		console.log(secret, algorithm, params, body, test)
		const hmacPayload = Object.keys(params)
			.filter(item => item.startsWith('checkout-'))
			.sort()
			.map(key => `${key}:${params[key]}`)
			.concat(body || '')
			.join('\n')

		return crypto
			.createHmac(algorithm, secret)
			.update(hmacPayload)
			.digest('hex')
	}

	validateResponse(params: string, body: string): boolean {
		// Pull signature algorithm from params.

		

		const paramsJSON = JSON.parse(params)
		const bodyJson = JSON.parse(JSON.parse(JSON.stringify(body)))
		

		const algorithm = paramsJSON['checkout-algorithm']
		const signature = paramsJSON['signature']

		console.log(paramsJSON, bodyJson)

		// Check that response is hashed with secure algorithm.
		
		if (!isSupportedAlgorithm(algorithm)) {
			throw new Error(`${algorithm} is not supported signature algorithm`)
		}

		console.log(signature, "----", CheckoutApi.calcMac(this.secret, algorithm, paramsJSON, bodyJson, "2"))
		// Check signature.
		return signature === CheckoutApi.calcMac(this.secret, algorithm, paramsJSON, bodyJson, "2")
		
	}

	createPayment(data: CheckoutPaymentOptions): Promise<CheckoutPayment> {
		return this.sendRequest('POST', `/payments`, this.makeHeaders('POST'), JSON.stringify(data))
	}

	sendRequest<T extends {}>(method: string, url: string, headers: Dictionary<string>, body?: string): Promise<T> {
		// Add signature header.
		console.log(this.secret, this.algorithm, headers, body)


		var signatureCOde = CheckoutApi.calcMac(this.secret, this.algorithm, headers, body, "1")
		console.log(signatureCOde)
		headers.signature = signatureCOde
		// Expected HMAC: 3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6
		console.log(headers)
		headers['Content-Type'] = 'application/json; charset=utf-8'

		return axios
			.post(url, body, {
				baseURL: CHECKOUT_ENDPOINT,
				responseType: 'json',
				transformRequest: [(data, headers1) => {
					// Do whatever you want here, for example headers.Authorization = `Bearer ${jwt}`
					console.log(data, headers1)
					console.log(JSON.stringify(data))
					if (!this.validateResponse(JSON.stringify(headers1), JSON.stringify(data))) {
					  //console.log(headerTest, bodyTest)
					  throw new Error('Signature verification failed')
					}
					
				}],
				headers
			})
			.then(response => response.data)
	}

	private makeHeaders(method: string): Dictionary<string> {
		return {
			/*
			'checkout-account': this.merchantId,
			'checkout-algorithm': this.algorithm,
			'checkout-method': method,
			'checkout-nonce': uuid(),
			'checkout-timestamp': new Date().toISOString()
			*/

			'checkout-account': this.merchantId,
			'checkout-algorithm': 'sha256',
			'checkout-method': 'POST',
			'checkout-nonce': '564635208570151',
			'checkout-timestamp': '2018-07-06T10:01:31.904Z',
		}
	}
}