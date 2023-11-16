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
import AccountPaymentHistoryView from './AccountPaymentHistoryView';

/**
 * The TeacherPaymentHistoryView model module.
 * @module model/TeacherPaymentHistoryView
 * @version v1
 */
class TeacherPaymentHistoryView {
    /**
     * Constructs a new <code>TeacherPaymentHistoryView</code>.
     * @alias module:model/TeacherPaymentHistoryView
     */
    constructor() { 
        
        TeacherPaymentHistoryView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TeacherPaymentHistoryView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeacherPaymentHistoryView} obj Optional instance to populate.
     * @return {module:model/TeacherPaymentHistoryView} The populated <code>TeacherPaymentHistoryView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeacherPaymentHistoryView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('teacherNumber')) {
                obj['teacherNumber'] = ApiClient.convertToType(data['teacherNumber'], 'String');
            }
            if (data.hasOwnProperty('rating')) {
                obj['rating'] = ApiClient.convertToType(data['rating'], 'Number');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountPaymentHistoryView.constructFromObject(data['account']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TeacherPaymentHistoryView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TeacherPaymentHistoryView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['teacherNumber'] && !(typeof data['teacherNumber'] === 'string' || data['teacherNumber'] instanceof String)) {
            throw new Error("Expected the field `teacherNumber` to be a primitive type in the JSON string but got " + data['teacherNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountPaymentHistoryView.validateJSON(data['account']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
TeacherPaymentHistoryView.prototype['id'] = undefined;

/**
 * @member {String} teacherNumber
 */
TeacherPaymentHistoryView.prototype['teacherNumber'] = undefined;

/**
 * @member {Number} rating
 */
TeacherPaymentHistoryView.prototype['rating'] = undefined;

/**
 * @member {module:model/AccountPaymentHistoryView} account
 */
TeacherPaymentHistoryView.prototype['account'] = undefined;






export default TeacherPaymentHistoryView;
