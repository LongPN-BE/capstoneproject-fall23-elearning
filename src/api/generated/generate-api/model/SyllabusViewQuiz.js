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
import CourseViewQuiz from './CourseViewQuiz';
import LessonViewQuiz from './LessonViewQuiz';

/**
 * The SyllabusViewQuiz model module.
 * @module model/SyllabusViewQuiz
 * @version v1
 */
class SyllabusViewQuiz {
    /**
     * Constructs a new <code>SyllabusViewQuiz</code>.
     * @alias module:model/SyllabusViewQuiz
     */
    constructor() { 
        
        SyllabusViewQuiz.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SyllabusViewQuiz</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyllabusViewQuiz} obj Optional instance to populate.
     * @return {module:model/SyllabusViewQuiz} The populated <code>SyllabusViewQuiz</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SyllabusViewQuiz();

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
                obj['course'] = CourseViewQuiz.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('lessons')) {
                obj['lessons'] = ApiClient.convertToType(data['lessons'], [LessonViewQuiz]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SyllabusViewQuiz</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SyllabusViewQuiz</code>.
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
          CourseViewQuiz.validateJSON(data['course']);
        }
        if (data['lessons']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['lessons'])) {
                throw new Error("Expected the field `lessons` to be an array in the JSON data but got " + data['lessons']);
            }
            // validate the optional field `lessons` (array)
            for (const item of data['lessons']) {
                LessonViewQuiz.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {String} name
 */
SyllabusViewQuiz.prototype['name'] = undefined;

/**
 * @member {String} status
 */
SyllabusViewQuiz.prototype['status'] = undefined;

/**
 * @member {Date} createDate
 */
SyllabusViewQuiz.prototype['createDate'] = undefined;

/**
 * @member {module:model/CourseViewQuiz} course
 */
SyllabusViewQuiz.prototype['course'] = undefined;

/**
 * @member {Array.<module:model/LessonViewQuiz>} lessons
 */
SyllabusViewQuiz.prototype['lessons'] = undefined;






export default SyllabusViewQuiz;

