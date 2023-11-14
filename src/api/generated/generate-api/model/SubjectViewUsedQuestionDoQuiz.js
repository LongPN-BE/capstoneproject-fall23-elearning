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
import StaffViewUsedQuestionDoQuiz from './StaffViewUsedQuestionDoQuiz';

/**
 * The SubjectViewUsedQuestionDoQuiz model module.
 * @module model/SubjectViewUsedQuestionDoQuiz
 * @version v1
 */
class SubjectViewUsedQuestionDoQuiz {
    /**
     * Constructs a new <code>SubjectViewUsedQuestionDoQuiz</code>.
     * @alias module:model/SubjectViewUsedQuestionDoQuiz
     */
    constructor() { 
        
        SubjectViewUsedQuestionDoQuiz.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SubjectViewUsedQuestionDoQuiz</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubjectViewUsedQuestionDoQuiz} obj Optional instance to populate.
     * @return {module:model/SubjectViewUsedQuestionDoQuiz} The populated <code>SubjectViewUsedQuestionDoQuiz</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectViewUsedQuestionDoQuiz();

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('minPrice')) {
                obj['minPrice'] = ApiClient.convertToType(data['minPrice'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
            if (data.hasOwnProperty('staff')) {
                obj['staff'] = StaffViewUsedQuestionDoQuiz.constructFromObject(data['staff']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubjectViewUsedQuestionDoQuiz</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubjectViewUsedQuestionDoQuiz</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `staff`
        if (data['staff']) { // data not null
          StaffViewUsedQuestionDoQuiz.validateJSON(data['staff']);
        }

        return true;
    }


}



/**
 * @member {String} description
 */
SubjectViewUsedQuestionDoQuiz.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
SubjectViewUsedQuestionDoQuiz.prototype['createDate'] = undefined;

/**
 * @member {Number} minPrice
 */
SubjectViewUsedQuestionDoQuiz.prototype['minPrice'] = undefined;

/**
 * @member {Boolean} status
 */
SubjectViewUsedQuestionDoQuiz.prototype['status'] = undefined;

/**
 * @member {module:model/StaffViewUsedQuestionDoQuiz} staff
 */
SubjectViewUsedQuestionDoQuiz.prototype['staff'] = undefined;






export default SubjectViewUsedQuestionDoQuiz;

