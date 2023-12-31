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
import AccountFeedbackView from './AccountFeedbackView';

/**
 * The StudentFeedbackView model module.
 * @module model/StudentFeedbackView
 * @version v1
 */
class StudentFeedbackView {
    /**
     * Constructs a new <code>StudentFeedbackView</code>.
     * @alias module:model/StudentFeedbackView
     */
    constructor() { 
        
        StudentFeedbackView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>StudentFeedbackView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StudentFeedbackView} obj Optional instance to populate.
     * @return {module:model/StudentFeedbackView} The populated <code>StudentFeedbackView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StudentFeedbackView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('studentNumber')) {
                obj['studentNumber'] = ApiClient.convertToType(data['studentNumber'], 'String');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountFeedbackView.constructFromObject(data['account']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>StudentFeedbackView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>StudentFeedbackView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['studentNumber'] && !(typeof data['studentNumber'] === 'string' || data['studentNumber'] instanceof String)) {
            throw new Error("Expected the field `studentNumber` to be a primitive type in the JSON string but got " + data['studentNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountFeedbackView.validateJSON(data['account']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
StudentFeedbackView.prototype['id'] = undefined;

/**
 * @member {String} studentNumber
 */
StudentFeedbackView.prototype['studentNumber'] = undefined;

/**
 * @member {module:model/AccountFeedbackView} account
 */
StudentFeedbackView.prototype['account'] = undefined;






export default StudentFeedbackView;

