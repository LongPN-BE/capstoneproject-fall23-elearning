/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The PayoutRequestWithdrawRequestView model module.
 * @module model/PayoutRequestWithdrawRequestView
 * @version v1
 */
class PayoutRequestWithdrawRequestView {
    /**
     * Constructs a new <code>PayoutRequestWithdrawRequestView</code>.
     * @alias module:model/PayoutRequestWithdrawRequestView
     */
    constructor() { 
        
        PayoutRequestWithdrawRequestView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PayoutRequestWithdrawRequestView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PayoutRequestWithdrawRequestView} obj Optional instance to populate.
     * @return {module:model/PayoutRequestWithdrawRequestView} The populated <code>PayoutRequestWithdrawRequestView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PayoutRequestWithdrawRequestView();

            if (data.hasOwnProperty('accountId')) {
                obj['accountId'] = ApiClient.convertToType(data['accountId'], 'Number');
            }
            if (data.hasOwnProperty('amountValue')) {
                obj['amountValue'] = ApiClient.convertToType(data['amountValue'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PayoutRequestWithdrawRequestView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PayoutRequestWithdrawRequestView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['amountValue'] && !(typeof data['amountValue'] === 'string' || data['amountValue'] instanceof String)) {
            throw new Error("Expected the field `amountValue` to be a primitive type in the JSON string but got " + data['amountValue']);
        }

        return true;
    }


}



/**
 * @member {Number} accountId
 */
PayoutRequestWithdrawRequestView.prototype['accountId'] = undefined;

/**
 * @member {String} amountValue
 */
PayoutRequestWithdrawRequestView.prototype['amountValue'] = undefined;






export default PayoutRequestWithdrawRequestView;
