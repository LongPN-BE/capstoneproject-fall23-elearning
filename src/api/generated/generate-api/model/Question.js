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
import Answer from './Answer';
import Course from './Course';
import Lesson from './Lesson';
import Teacher from './Teacher';

/**
 * The Question model module.
 * @module model/Question
 * @version v1
 */
class Question {
    /**
     * Constructs a new <code>Question</code>.
     * @alias module:model/Question
     */
    constructor() { 
        
        Question.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Question</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Question} obj Optional instance to populate.
     * @return {module:model/Question} The populated <code>Question</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Question();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('answers')) {
                obj['answers'] = ApiClient.convertToType(data['answers'], [Answer]);
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = Teacher.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('course')) {
                obj['course'] = Course.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('lesson')) {
                obj['lesson'] = Lesson.constructFromObject(data['lesson']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Question</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Question</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        if (data['answers']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['answers'])) {
                throw new Error("Expected the field `answers` to be an array in the JSON data but got " + data['answers']);
            }
            // validate the optional field `answers` (array)
            for (const item of data['answers']) {
                Answer.validateJsonObject(item);
            };
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          Teacher.validateJSON(data['teacher']);
        }
        // validate the optional field `course`
        if (data['course']) { // data not null
          Course.validateJSON(data['course']);
        }
        // validate the optional field `lesson`
        if (data['lesson']) { // data not null
          Lesson.validateJSON(data['lesson']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
Question.prototype['id'] = undefined;

/**
 * @member {String} content
 */
Question.prototype['content'] = undefined;

/**
 * @member {Array.<module:model/Answer>} answers
 */
Question.prototype['answers'] = undefined;

/**
 * @member {module:model/Teacher} teacher
 */
Question.prototype['teacher'] = undefined;

/**
 * @member {module:model/Course} course
 */
Question.prototype['course'] = undefined;

/**
 * @member {module:model/Lesson} lesson
 */
Question.prototype['lesson'] = undefined;






export default Question;
