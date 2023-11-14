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
import AccountQuestionView from './AccountQuestionView';

/**
 * The TeacherQuestionView model module.
 * @module model/TeacherQuestionView
 * @version v1
 */
class TeacherQuestionView {
    /**
     * Constructs a new <code>TeacherQuestionView</code>.
     * @alias module:model/TeacherQuestionView
     */
    constructor() { 
        
        TeacherQuestionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TeacherQuestionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeacherQuestionView} obj Optional instance to populate.
     * @return {module:model/TeacherQuestionView} The populated <code>TeacherQuestionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeacherQuestionView();

            if (data.hasOwnProperty('teacherNumber')) {
                obj['teacherNumber'] = ApiClient.convertToType(data['teacherNumber'], 'String');
            }
            if (data.hasOwnProperty('rating')) {
                obj['rating'] = ApiClient.convertToType(data['rating'], 'Number');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountQuestionView.constructFromObject(data['account']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TeacherQuestionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TeacherQuestionView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['teacherNumber'] && !(typeof data['teacherNumber'] === 'string' || data['teacherNumber'] instanceof String)) {
            throw new Error("Expected the field `teacherNumber` to be a primitive type in the JSON string but got " + data['teacherNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountQuestionView.validateJSON(data['account']);
        }

        return true;
    }


}



/**
 * @member {String} teacherNumber
 */
TeacherQuestionView.prototype['teacherNumber'] = undefined;

/**
 * @member {Number} rating
 */
TeacherQuestionView.prototype['rating'] = undefined;

/**
 * @member {module:model/AccountQuestionView} account
 */
TeacherQuestionView.prototype['account'] = undefined;






export default TeacherQuestionView;

