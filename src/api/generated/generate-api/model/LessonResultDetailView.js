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
import CourseResultDetailView from './CourseResultDetailView';
import ResourceResultDetailView from './ResourceResultDetailView';
import SyllabusResultDetailView from './SyllabusResultDetailView';

/**
 * The LessonResultDetailView model module.
 * @module model/LessonResultDetailView
 * @version v1
 */
class LessonResultDetailView {
    /**
     * Constructs a new <code>LessonResultDetailView</code>.
     * @alias module:model/LessonResultDetailView
     */
    constructor() { 
        
        LessonResultDetailView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>LessonResultDetailView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LessonResultDetailView} obj Optional instance to populate.
     * @return {module:model/LessonResultDetailView} The populated <code>LessonResultDetailView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LessonResultDetailView();

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
            if (data.hasOwnProperty('course')) {
                obj['course'] = CourseResultDetailView.constructFromObject(data['course']);
            }
            if (data.hasOwnProperty('resources')) {
                obj['resources'] = ApiClient.convertToType(data['resources'], [ResourceResultDetailView]);
            }
            if (data.hasOwnProperty('syllabuses')) {
                obj['syllabuses'] = ApiClient.convertToType(data['syllabuses'], [SyllabusResultDetailView]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LessonResultDetailView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LessonResultDetailView</code>.
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
        // validate the optional field `course`
        if (data['course']) { // data not null
          CourseResultDetailView.validateJSON(data['course']);
        }
        if (data['resources']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['resources'])) {
                throw new Error("Expected the field `resources` to be an array in the JSON data but got " + data['resources']);
            }
            // validate the optional field `resources` (array)
            for (const item of data['resources']) {
                ResourceResultDetailView.validateJsonObject(item);
            };
        }
        if (data['syllabuses']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['syllabuses'])) {
                throw new Error("Expected the field `syllabuses` to be an array in the JSON data but got " + data['syllabuses']);
            }
            // validate the optional field `syllabuses` (array)
            for (const item of data['syllabuses']) {
                SyllabusResultDetailView.validateJsonObject(item);
            };
        }

        return true;
    }


}



/**
 * @member {String} name
 */
LessonResultDetailView.prototype['name'] = undefined;

/**
 * @member {String} status
 */
LessonResultDetailView.prototype['status'] = undefined;

/**
 * @member {String} description
 */
LessonResultDetailView.prototype['description'] = undefined;

/**
 * @member {String} url
 */
LessonResultDetailView.prototype['url'] = undefined;

/**
 * @member {Date} dateTime
 */
LessonResultDetailView.prototype['dateTime'] = undefined;

/**
 * @member {Number} estimateTime
 */
LessonResultDetailView.prototype['estimateTime'] = undefined;

/**
 * @member {module:model/CourseResultDetailView} course
 */
LessonResultDetailView.prototype['course'] = undefined;

/**
 * @member {Array.<module:model/ResourceResultDetailView>} resources
 */
LessonResultDetailView.prototype['resources'] = undefined;

/**
 * @member {Array.<module:model/SyllabusResultDetailView>} syllabuses
 */
LessonResultDetailView.prototype['syllabuses'] = undefined;






export default LessonResultDetailView;

