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
 * The RefundRequestEnrollView model module.
 * @module model/RefundRequestEnrollView
 * @version v1
 */
class RefundRequestEnrollView {
    /**
     * Constructs a new <code>RefundRequestEnrollView</code>.
     * @alias module:model/RefundRequestEnrollView
     */
    constructor() { 
        
        RefundRequestEnrollView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>RefundRequestEnrollView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RefundRequestEnrollView} obj Optional instance to populate.
     * @return {module:model/RefundRequestEnrollView} The populated <code>RefundRequestEnrollView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RefundRequestEnrollView();

            if (data.hasOwnProperty('studentId')) {
                obj['studentId'] = ApiClient.convertToType(data['studentId'], 'Number');
            }
            if (data.hasOwnProperty('courseId')) {
                obj['courseId'] = ApiClient.convertToType(data['courseId'], 'Number');
            }
            if (data.hasOwnProperty('transactionId')) {
                obj['transactionId'] = ApiClient.convertToType(data['transactionId'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RefundRequestEnrollView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RefundRequestEnrollView</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Number} studentId
 */
RefundRequestEnrollView.prototype['studentId'] = undefined;

/**
 * @member {Number} courseId
 */
RefundRequestEnrollView.prototype['courseId'] = undefined;

/**
 * @member {Number} transactionId
 */
RefundRequestEnrollView.prototype['transactionId'] = undefined;






export default RefundRequestEnrollView;
