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
import AccountViewUsedQuestionDoQuiz from './AccountViewUsedQuestionDoQuiz';

/**
 * The TeacherViewUsedQuestionDoQuiz model module.
 * @module model/TeacherViewUsedQuestionDoQuiz
 * @version v1
 */
class TeacherViewUsedQuestionDoQuiz {
    /**
     * Constructs a new <code>TeacherViewUsedQuestionDoQuiz</code>.
     * @alias module:model/TeacherViewUsedQuestionDoQuiz
     */
    constructor() { 
        
        TeacherViewUsedQuestionDoQuiz.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TeacherViewUsedQuestionDoQuiz</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeacherViewUsedQuestionDoQuiz} obj Optional instance to populate.
     * @return {module:model/TeacherViewUsedQuestionDoQuiz} The populated <code>TeacherViewUsedQuestionDoQuiz</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeacherViewUsedQuestionDoQuiz();

            if (data.hasOwnProperty('teacherNumber')) {
                obj['teacherNumber'] = ApiClient.convertToType(data['teacherNumber'], 'String');
            }
            if (data.hasOwnProperty('rating')) {
                obj['rating'] = ApiClient.convertToType(data['rating'], 'Number');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountViewUsedQuestionDoQuiz.constructFromObject(data['account']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TeacherViewUsedQuestionDoQuiz</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TeacherViewUsedQuestionDoQuiz</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['teacherNumber'] && !(typeof data['teacherNumber'] === 'string' || data['teacherNumber'] instanceof String)) {
            throw new Error("Expected the field `teacherNumber` to be a primitive type in the JSON string but got " + data['teacherNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountViewUsedQuestionDoQuiz.validateJSON(data['account']);
        }

        return true;
    }


}



/**
 * @member {String} teacherNumber
 */
TeacherViewUsedQuestionDoQuiz.prototype['teacherNumber'] = undefined;

/**
 * @member {Number} rating
 */
TeacherViewUsedQuestionDoQuiz.prototype['rating'] = undefined;

/**
 * @member {module:model/AccountViewUsedQuestionDoQuiz} account
 */
TeacherViewUsedQuestionDoQuiz.prototype['account'] = undefined;






export default TeacherViewUsedQuestionDoQuiz;

