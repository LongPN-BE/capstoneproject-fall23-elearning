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
 * The EnrollTransactionView model module.
 * @module model/EnrollTransactionView
 * @version v1
 */
class EnrollTransactionView {
    /**
     * Constructs a new <code>EnrollTransactionView</code>.
     * @alias module:model/EnrollTransactionView
     */
    constructor() { 
        
        EnrollTransactionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>EnrollTransactionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EnrollTransactionView} obj Optional instance to populate.
     * @return {module:model/EnrollTransactionView} The populated <code>EnrollTransactionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new EnrollTransactionView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('requestDate')) {
                obj['requestDate'] = ApiClient.convertToType(data['requestDate'], 'Date');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('paymentStatus')) {
                obj['paymentStatus'] = ApiClient.convertToType(data['paymentStatus'], 'String');
            }
            if (data.hasOwnProperty('commission')) {
                obj['commission'] = ApiClient.convertToType(data['commission'], 'Number');
            }
            if (data.hasOwnProperty('commissionAmount')) {
                obj['commissionAmount'] = ApiClient.convertToType(data['commissionAmount'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('finishDate')) {
                obj['finishDate'] = ApiClient.convertToType(data['finishDate'], 'Date');
            }
            if (data.hasOwnProperty('banned')) {
                obj['banned'] = ApiClient.convertToType(data['banned'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EnrollTransactionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EnrollTransactionView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['paymentStatus'] && !(typeof data['paymentStatus'] === 'string' || data['paymentStatus'] instanceof String)) {
            throw new Error("Expected the field `paymentStatus` to be a primitive type in the JSON string but got " + data['paymentStatus']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
EnrollTransactionView.prototype['id'] = undefined;

/**
 * @member {Date} requestDate
 */
EnrollTransactionView.prototype['requestDate'] = undefined;

/**
 * @member {Number} amount
 */
EnrollTransactionView.prototype['amount'] = undefined;

/**
 * @member {String} paymentStatus
 */
EnrollTransactionView.prototype['paymentStatus'] = undefined;

/**
 * @member {Number} commission
 */
EnrollTransactionView.prototype['commission'] = undefined;

/**
 * @member {Number} commissionAmount
 */
EnrollTransactionView.prototype['commissionAmount'] = undefined;

/**
 * @member {module:model/EnrollTransactionView.StatusEnum} status
 */
EnrollTransactionView.prototype['status'] = undefined;

/**
 * @member {Date} finishDate
 */
EnrollTransactionView.prototype['finishDate'] = undefined;

/**
 * @member {Boolean} banned
 */
EnrollTransactionView.prototype['banned'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
EnrollTransactionView['StatusEnum'] = {

    /**
     * value: "PROCESSING"
     * @const
     */
    "PROCESSING": "PROCESSING",

    /**
     * value: "DONE"
     * @const
     */
    "DONE": "DONE",

    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",

    /**
     * value: "REMOVED"
     * @const
     */
    "REMOVED": "REMOVED",

    /**
     * value: "REFUNDED"
     * @const
     */
    "REFUNDED": "REFUNDED"
};



export default EnrollTransactionView;

