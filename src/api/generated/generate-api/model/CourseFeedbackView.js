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
import SubjectFeedbackView from './SubjectFeedbackView';
import TeacherFeedbackView from './TeacherFeedbackView';

/**
 * The CourseFeedbackView model module.
 * @module model/CourseFeedbackView
 * @version v1
 */
class CourseFeedbackView {
    /**
     * Constructs a new <code>CourseFeedbackView</code>.
     * @alias module:model/CourseFeedbackView
     */
    constructor() { 
        
        CourseFeedbackView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CourseFeedbackView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CourseFeedbackView} obj Optional instance to populate.
     * @return {module:model/CourseFeedbackView} The populated <code>CourseFeedbackView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CourseFeedbackView();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('limitTime')) {
                obj['limitTime'] = ApiClient.convertToType(data['limitTime'], 'Number');
            }
            if (data.hasOwnProperty('averagePoint')) {
                obj['averagePoint'] = ApiClient.convertToType(data['averagePoint'], 'Number');
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherFeedbackView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectFeedbackView.constructFromObject(data['subject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CourseFeedbackView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CourseFeedbackView</code>.
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
        if (data['image'] && !(typeof data['image'] === 'string' || data['image'] instanceof String)) {
            throw new Error("Expected the field `image` to be a primitive type in the JSON string but got " + data['image']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherFeedbackView.validateJSON(data['teacher']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectFeedbackView.validateJSON(data['subject']);
        }

        return true;
    }


}



/**
 * @member {String} name
 */
CourseFeedbackView.prototype['name'] = undefined;

/**
 * @member {String} status
 */
CourseFeedbackView.prototype['status'] = undefined;

/**
 * @member {String} image
 */
CourseFeedbackView.prototype['image'] = undefined;

/**
 * @member {String} description
 */
CourseFeedbackView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
CourseFeedbackView.prototype['createDate'] = undefined;

/**
 * @member {Number} price
 */
CourseFeedbackView.prototype['price'] = undefined;

/**
 * @member {Number} limitTime
 */
CourseFeedbackView.prototype['limitTime'] = undefined;

/**
 * @member {Number} averagePoint
 */
CourseFeedbackView.prototype['averagePoint'] = undefined;

/**
 * @member {module:model/TeacherFeedbackView} teacher
 */
CourseFeedbackView.prototype['teacher'] = undefined;

/**
 * @member {module:model/SubjectFeedbackView} subject
 */
CourseFeedbackView.prototype['subject'] = undefined;






export default CourseFeedbackView;

