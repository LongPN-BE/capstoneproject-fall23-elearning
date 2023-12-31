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
 * The LessonRequestLessonView model module.
 * @module model/LessonRequestLessonView
 * @version v1
 */
class LessonRequestLessonView {
    /**
     * Constructs a new <code>LessonRequestLessonView</code>.
     * @alias module:model/LessonRequestLessonView
     */
    constructor() { 
        
        LessonRequestLessonView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>LessonRequestLessonView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonRequestLessonView} obj Optional instance to populate.
     * @return {module:model/LessonRequestLessonView} The populated <code>LessonRequestLessonView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LessonRequestLessonView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
            if (data.hasOwnProperty('dateTime')) {
                obj['dateTime'] = ApiClient.convertToType(data['dateTime'], 'Date');
            }
            if (data.hasOwnProperty('estimateTime')) {
                obj['estimateTime'] = ApiClient.convertToType(data['estimateTime'], 'Number');
            }
            if (data.hasOwnProperty('courseId')) {
                obj['courseId'] = ApiClient.convertToType(data['courseId'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('syllabusIds')) {
                obj['syllabusIds'] = ApiClient.convertToType(data['syllabusIds'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LessonRequestLessonView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LessonRequestLessonView</code>.
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
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['url'] && !(typeof data['url'] === 'string' || data['url'] instanceof String)) {
            throw new Error("Expected the field `url` to be a primitive type in the JSON string but got " + data['url']);
        }
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['syllabusIds'])) {
            throw new Error("Expected the field `syllabusIds` to be an array in the JSON data but got " + data['syllabusIds']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
LessonRequestLessonView.prototype['id'] = undefined;

/**
 * @member {String} name
 */
LessonRequestLessonView.prototype['name'] = undefined;

/**
 * @member {String} status
 */
LessonRequestLessonView.prototype['status'] = undefined;

/**
 * @member {String} description
 */
LessonRequestLessonView.prototype['description'] = undefined;

/**
 * @member {String} url
 */
LessonRequestLessonView.prototype['url'] = undefined;

/**
 * @member {Date} dateTime
 */
LessonRequestLessonView.prototype['dateTime'] = undefined;

/**
 * @member {Number} estimateTime
 */
LessonRequestLessonView.prototype['estimateTime'] = undefined;

/**
 * @member {Number} courseId
 */
LessonRequestLessonView.prototype['courseId'] = undefined;

/**
 * @member {String} content
 */
LessonRequestLessonView.prototype['content'] = undefined;

/**
 * Type is VIDEO or READING
 * @member {String} type
 */
LessonRequestLessonView.prototype['type'] = undefined;

/**
 * @member {Array.<String>} syllabusIds
 */
LessonRequestLessonView.prototype['syllabusIds'] = undefined;






export default LessonRequestLessonView;

