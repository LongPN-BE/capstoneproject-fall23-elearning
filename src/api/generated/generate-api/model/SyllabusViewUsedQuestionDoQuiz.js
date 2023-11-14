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
import CourseViewUsedQuestionDoQuiz from './CourseViewUsedQuestionDoQuiz';
import LessonViewUsedQuestionDoQuiz from './LessonViewUsedQuestionDoQuiz';

/**
 * The SyllabusViewUsedQuestionDoQuiz model module.
 * @module model/SyllabusViewUsedQuestionDoQuiz
 * @version v1
 */
class SyllabusViewUsedQuestionDoQuiz {
    /**
     * Constructs a new <code>SyllabusViewUsedQuestionDoQuiz</code>.
     * @alias module:model/SyllabusViewUsedQuestionDoQuiz
     */
    constructor() { 
        
        SyllabusViewUsedQuestionDoQuiz.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SyllabusViewUsedQuestionDoQuiz</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyllabusViewUsedQuestionDoQuiz} obj Optional instance to populate.
     * @return {module:model/SyllabusViewUsedQuestionDoQuiz} The populated <code>SyllabusViewUsedQuestionDoQuiz</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SyllabusViewUsedQuestionDoQuiz();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('course')) {
                obj['course'] = CourseViewUsedQuestionDoQuiz.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('lessons')) {
                obj['lessons'] = ApiClient.convertToType(data['lessons'], [LessonViewUsedQuestionDoQuiz]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SyllabusViewUsedQuestionDoQuiz</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SyllabusViewUsedQuestionDoQuiz</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // validate the optional field `course`
        if (data['course']) { // data not null
          CourseViewUsedQuestionDoQuiz.validateJSON(data['course']);
        }
        if (data['lessons']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['lessons'])) {
                throw new Error("Expected the field `lessons` to be an array in the JSON data but got " + data['lessons']);
            }
            // validate the optional field `lessons` (array)
            for (const item of data['lessons']) {
                LessonViewUsedQuestionDoQuiz.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {String} name
 */
SyllabusViewUsedQuestionDoQuiz.prototype['name'] = undefined;

/**
 * @member {String} status
 */
SyllabusViewUsedQuestionDoQuiz.prototype['status'] = undefined;

/**
 * @member {Date} createDate
 */
SyllabusViewUsedQuestionDoQuiz.prototype['createDate'] = undefined;

/**
 * @member {module:model/CourseViewUsedQuestionDoQuiz} course
 */
SyllabusViewUsedQuestionDoQuiz.prototype['course'] = undefined;

/**
 * @member {Array.<module:model/LessonViewUsedQuestionDoQuiz>} lessons
 */
SyllabusViewUsedQuestionDoQuiz.prototype['lessons'] = undefined;






export default SyllabusViewUsedQuestionDoQuiz;

