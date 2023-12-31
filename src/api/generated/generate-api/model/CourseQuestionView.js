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
import SubjectQuestionView from './SubjectQuestionView';
import TeacherQuestionView from './TeacherQuestionView';

/**
 * The CourseQuestionView model module.
 * @module model/CourseQuestionView
 * @version v1
 */
class CourseQuestionView {
    /**
     * Constructs a new <code>CourseQuestionView</code>.
     * @alias module:model/CourseQuestionView
     */
    constructor() { 
        
        CourseQuestionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CourseQuestionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CourseQuestionView} obj Optional instance to populate.
     * @return {module:model/CourseQuestionView} The populated <code>CourseQuestionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CourseQuestionView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
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
                obj['teacher'] = TeacherQuestionView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectQuestionView.constructFromObject(data['subject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CourseQuestionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CourseQuestionView</code>.
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
          TeacherQuestionView.validateJSON(data['teacher']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectQuestionView.validateJSON(data['subject']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
CourseQuestionView.prototype['id'] = undefined;

/**
 * @member {String} name
 */
CourseQuestionView.prototype['name'] = undefined;

/**
 * @member {module:model/CourseQuestionView.StatusEnum} status
 */
CourseQuestionView.prototype['status'] = undefined;

/**
 * @member {String} image
 */
CourseQuestionView.prototype['image'] = undefined;

/**
 * @member {String} description
 */
CourseQuestionView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
CourseQuestionView.prototype['createDate'] = undefined;

/**
 * @member {Number} price
 */
CourseQuestionView.prototype['price'] = undefined;

/**
 * @member {Number} limitTime
 */
CourseQuestionView.prototype['limitTime'] = undefined;

/**
 * @member {Number} averagePoint
 */
CourseQuestionView.prototype['averagePoint'] = undefined;

/**
 * @member {module:model/TeacherQuestionView} teacher
 */
CourseQuestionView.prototype['teacher'] = undefined;

/**
 * @member {module:model/SubjectQuestionView} subject
 */
CourseQuestionView.prototype['subject'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
CourseQuestionView['StatusEnum'] = {

    /**
     * value: "ACTIVE"
     * @const
     */
    "ACTIVE": "ACTIVE",

    /**
     * value: "DEACTIVE"
     * @const
     */
    "DEACTIVE": "DEACTIVE",

    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",

    /**
     * value: "DRAFT"
     * @const
     */
    "DRAFT": "DRAFT",

    /**
     * value: "REJECT"
     * @const
     */
    "REJECT": "REJECT"
};



export default CourseQuestionView;

